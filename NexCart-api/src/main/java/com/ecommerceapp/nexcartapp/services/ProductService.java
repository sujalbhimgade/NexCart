package com.ecommerceapp.nexcartapp.services;


import com.ecommerceapp.nexcartapp.dto.ProductRequest;
import com.ecommerceapp.nexcartapp.exception.CategoryNotFoundException;
import com.ecommerceapp.nexcartapp.exception.ProductNotFoundException;
import com.ecommerceapp.nexcartapp.model.Product;

import java.util.List;

public interface ProductService {

    public Product getProductById(Long id) throws ProductNotFoundException;

    List<Product> getAllProduct();

    List<Product> getAllProductByNameLike(String name);

    public Product addProduct(ProductRequest productRequest) throws CategoryNotFoundException;
    public Product deleteProductById(Long id) throws ProductNotFoundException;

    List<Product> getProductsRandomly();
}
