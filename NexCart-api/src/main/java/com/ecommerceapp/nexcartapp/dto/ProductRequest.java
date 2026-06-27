package com.ecommerceapp.nexcartapp.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductRequest {

    private String name;
    private String brand;
    private String description;
    private String imageUrl;
    private BigDecimal price;
    private BigDecimal discountPercent;
    private Double rating;
    private Long categoryId;
    private Long stockQuantity;

}
