package com.ecommerceapp.nexcartapp.services;

import com.ecommerceapp.nexcartapp.exception.CategoryAlreadyExistException;
import com.ecommerceapp.nexcartapp.exception.CategoryNotFoundException;
import com.ecommerceapp.nexcartapp.model.Category;
import com.ecommerceapp.nexcartapp.model.Product;

import java.util.List;

public interface CategoryService {

    List<Category> getAllCategory();

    public Category createCategory(Category category) throws CategoryAlreadyExistException;
    public Category getCategoryById(Long id) throws CategoryNotFoundException;
    public Category deleteCategoryById(Long id) throws CategoryNotFoundException;

    List<Product> getAllProductsByCategoryId(Long categoryId) throws CategoryNotFoundException;
}
