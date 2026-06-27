package com.ecommerceapp.nexcartapp.services.impl;

import com.ecommerceapp.nexcartapp.dto.ProductRequest;
import com.ecommerceapp.nexcartapp.exception.CategoryNotFoundException;
import com.ecommerceapp.nexcartapp.exception.ProductNotFoundException;
import com.ecommerceapp.nexcartapp.model.Category;
import com.ecommerceapp.nexcartapp.model.Product;
import com.ecommerceapp.nexcartapp.repository.CategoryRepository;
import com.ecommerceapp.nexcartapp.repository.ProductRepository;
import com.ecommerceapp.nexcartapp.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Override
    public Product getProductById(Long id) throws ProductNotFoundException {
        return productRepository.findById(id).orElseThrow(() -> new ProductNotFoundException("No Product found with id: "+id));
    }

    @Override
    public List<Product> getAllProduct()  {
        return productRepository.findAll();
    }

    @Override
    public List<Product> getAllProductByNameLike(String name)  {
        return productRepository.findByNameLike(name);
    }



    @Override
    public Product addProduct(ProductRequest productRequest) throws CategoryNotFoundException {

        Category category = categoryRepository.findById(productRequest.getCategoryId()).orElseThrow(() -> new CategoryNotFoundException("No Category found with id"+productRequest.getCategoryId()));


        Product product = new Product();
        product.setName(productRequest.getName());
        product.setBrand(productRequest.getBrand());
        product.setDescription(productRequest.getDescription());
        product.setImageUrl(productRequest.getImageUrl());
        product.setPrice(productRequest.getPrice());
        product.setDiscountPercent(productRequest.getDiscountPercent());
        product.setRating(productRequest.getRating() != null ? productRequest.getRating() : 0.0);
        product.setStockQuantity(productRequest.getStockQuantity());
        product.setCategory(category);



        // updating the product list for the  category
        category.getProducts().add(product);

        return productRepository.save(product);
    }

    @Override
    public Product deleteProductById(Long id) throws ProductNotFoundException {
        Product product = productRepository.findById(id).orElseThrow(() -> new ProductNotFoundException("No Product Found with id:"+id));
        productRepository.deleteById(id);
        return product;
    }

    @Override
    public List<Product> getProductsRandomly() {
        List<Product> randomProducts = productRepository.findAll();
        Collections.shuffle(randomProducts);
        return randomProducts;
    }
}