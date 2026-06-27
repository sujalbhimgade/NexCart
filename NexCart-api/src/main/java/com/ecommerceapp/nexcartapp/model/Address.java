package com.ecommerceapp.nexcartapp.model;

import jakarta.persistence.*;
import lombok.*;


@Getter
@Setter
@ToString
@Embeddable
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Address {
//    @Column(nullable = false)
    private String addressLine1;

    private String addressLine2;

//    @Column(nullable = false)
    private String city;

//    @Column(nullable = false)
    private String state;

//    @Column(nullable = false)
    private String zipcode;

    // getters and setters
}
//Used @Embedded for the Address class to make it a value object.