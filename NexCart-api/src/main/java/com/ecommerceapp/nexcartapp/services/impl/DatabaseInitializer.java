package com.ecommerceapp.nexcartapp.services.impl;

import com.ecommerceapp.nexcartapp.model.Category;
import com.ecommerceapp.nexcartapp.model.Role;
import com.ecommerceapp.nexcartapp.model.User;
import com.ecommerceapp.nexcartapp.repository.CategoryRepository;
import com.ecommerceapp.nexcartapp.repository.ProductRepository;
import com.ecommerceapp.nexcartapp.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class DatabaseInitializer {

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    private List<String> initialCategories = Arrays.asList("Dairy", "Medicine",
            "Namkeen & Biscuits", "Stationary", "Beverages" , "Personal Care" );

    @PostConstruct
    public void initialize(){
        feedCategoryDatabase();
        feedUserDatabase();
    }

    public void feedCategoryDatabase(){
        List<Category> categories = new ArrayList<>();
        for(String category: initialCategories){
            if(categoryRepository.findByName(category).isEmpty()){
                categories.add(Category.builder()
                        .name(category)
                        .build());
            }
        }
        categoryRepository.saveAll(categories);

    }

    public void feedUserDatabase(){
        if(userRepository.findByEmail("admin@email.com").isEmpty()){
            userRepository.save(
                    User.builder()
                            .firstName("admin")
                            .lastName("")
                            .role(Role.ADMIN)
                            .email("admin@email.com")
                            .password(passwordEncoder.encode("admin123"))
                            .build()
            );
        }

    }




}
