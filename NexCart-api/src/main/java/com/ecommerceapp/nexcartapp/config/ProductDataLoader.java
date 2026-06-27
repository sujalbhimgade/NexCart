package com.ecommerceapp.nexcartapp.config;

import com.ecommerceapp.nexcartapp.model.Product;
import com.ecommerceapp.nexcartapp.repository.ProductRepository;
import com.ecommerceapp.nexcartapp.model.Category;
import com.ecommerceapp.nexcartapp.repository.CategoryRepository;
import com.opencsv.CSVReader;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ProductDataLoader {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    @PostConstruct
    public void loadProducts() {

        try {


            if(productRepository.count() > 0){
                System.out.println("Product Count = " + productRepository.count());
                System.out.println("Products already exist. Skipping CSV import.");
                return;
            }


            try (CSVReader csvReader = new CSVReader(
                    new InputStreamReader(
                            new ClassPathResource("amazon-products.csv").getInputStream()
                    )
            )) {

                List<String[]> rows = csvReader.readAll();

                boolean firstRow = true;

                for(String[] row : rows){

                    if(firstRow){
                        firstRow = false;
                        continue;
                    }

                    try{

                        Product product = new Product();

                        product.setName(getValue(row,1));      // title
                        product.setBrand(getValue(row,3));     // brand

                        String ratingText = getValue(row,22);

                        double rating = 0.0;

                        try {
                            rating = Double.parseDouble(ratingText);
                        } catch (Exception e) {
                            rating = 0.0;
                        }

                        product.setRating(rating);

                        product.setDescription(getValue(row,4)); // description
                        product.setImageUrl(getValue(row,20));   // image_url

                        String priceText = getValue(row,6)       // final_price
                                .replace("\"", "")
                                .replace("$", "")
                                .replace(",", "")
                                .trim();

                        product.setPrice(
                                priceText.isEmpty()
                                        ? BigDecimal.ZERO
                                        : new BigDecimal(priceText)
                        );

                        product.setDiscountPercent(BigDecimal.ZERO);

                        product.setStockQuantity(100L);
                        Category category = detectCategory(
                                product.getName(),
                                product.getDescription(),
                                product.getBrand()
                        );

                        product.setCategory(category);

                        productRepository.save(product);

                    }catch(Exception e){
                        System.out.println("Failed row:");
                        e.printStackTrace();
                    }
                }

                System.out.println("Products Imported Successfully");
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private Category getOrCreateCategory(String name) {

        return categoryRepository.findByName(name)
                .orElseGet(() ->
                        categoryRepository.save(
                                Category.builder()
                                        .name(name)
                                        .build()
                        ));
    }
    private Category detectCategory(
            String productName,
            String description,
            String brand) {

        String text =
                (productName + " " + description + " " + brand)
                        .toLowerCase();

        if(text.contains("shoe")
                || text.contains("sneaker")
                || text.contains("boot")
                || text.contains("running")) {

            return getOrCreateCategory("Shoes");
        }

        if(text.contains("shirt")
                || text.contains("t-shirt")
                || text.contains("jeans")
                || text.contains("hoodie")
                || text.contains("jacket")
                || text.contains("dress")) {

            return getOrCreateCategory("Fashion");
        }

        if(text.contains("watch")
                || text.contains("headphone")
                || text.contains("earbuds")
                || text.contains("speaker")
                || text.contains("laptop")
                || text.contains("mobile")) {

            return getOrCreateCategory("Electronics");
        }

        if(text.contains("protein")
                || text.contains("fitness")
                || text.contains("gym")
                || text.contains("sport")
                || text.contains("yoga")) {

            return getOrCreateCategory("Sports");
        }

        if(text.contains("soap")
                || text.contains("shampoo")
                || text.contains("cream")
                || text.contains("face wash")
                || text.contains("beauty")) {

            return getOrCreateCategory("Beauty");
        }

        if(text.contains("book")) {

            return getOrCreateCategory("Books");
        }

        if(text.contains("kitchen")
                || text.contains("cookware")
                || text.contains("furniture")
                || text.contains("home")) {

            return getOrCreateCategory("Home");
        }

        return getOrCreateCategory("Others");
    }

    private String getValue(String[] row, int index){
        if(index >= row.length){
            return "";
        }
        return row[index] == null ? "" : row[index].trim();
    }
}