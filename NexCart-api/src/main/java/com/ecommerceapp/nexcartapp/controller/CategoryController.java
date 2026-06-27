package com.ecommerceapp.nexcartapp.controller;

import com.ecommerceapp.nexcartapp.exception.CategoryAlreadyExistException;
import com.ecommerceapp.nexcartapp.exception.CategoryNotFoundException;
import com.ecommerceapp.nexcartapp.model.Category;
import com.ecommerceapp.nexcartapp.model.Product;
import com.ecommerceapp.nexcartapp.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api")
public class CategoryController {

    @Autowired
    CategoryService categoryService;

    @GetMapping("/category/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable("id") Long id) throws CategoryNotFoundException {
        return new ResponseEntity<>(categoryService.getCategoryById(id), HttpStatus.OK);
    }

    @GetMapping("/category")
    public  ResponseEntity<List<Category>> getAllCategory()  {
        return new ResponseEntity<>(categoryService.getAllCategory(), HttpStatus.OK );
    }

    @PostMapping("/category")
    public  ResponseEntity<Category> createCategory(@RequestBody Category category) throws CategoryAlreadyExistException {
        return new ResponseEntity<>(categoryService.createCategory(category), HttpStatus.OK );
    }

    @DeleteMapping("/category/{id}")
    public ResponseEntity<Category> deleteCategoryById(@PathVariable("id") Long id) throws CategoryNotFoundException {
        return new ResponseEntity<>(categoryService.deleteCategoryById(id), HttpStatus.OK);
    }

    @GetMapping("/category/products/{id}")
    public ResponseEntity<List<Product>> getAllProductsByCategoryId(@PathVariable("id") Long id) throws CategoryNotFoundException {
        return new ResponseEntity<>(categoryService.getAllProductsByCategoryId(id), HttpStatus.OK);
    }


}
