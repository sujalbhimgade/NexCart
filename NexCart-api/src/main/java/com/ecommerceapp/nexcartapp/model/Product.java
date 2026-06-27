package com.ecommerceapp.nexcartapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String brand;

    @Column(nullable = false)
    private Double rating;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String description;

    @Column(columnDefinition = "TEXT")
    private String imageUrl;

    @Column(precision = 10, scale = 2, nullable = false)
    private BigDecimal price;

    @Column(precision = 10, scale = 2)
    private BigDecimal discountPercent;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @JsonIgnore
    private Category category;


    @Column(nullable = false)
    private Long stockQuantity;

    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private List<OrderItem> orderItems;


}


