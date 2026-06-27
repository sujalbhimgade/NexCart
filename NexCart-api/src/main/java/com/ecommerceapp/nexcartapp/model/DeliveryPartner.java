package com.ecommerceapp.nexcartapp.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Entity
@Getter
@Setter
@ToString


public class DeliveryPartner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long deliveryPartnerId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String contactNumber;

    @Column(nullable = false)
    private String email;

    // ... other fields as needed

    @OneToMany(mappedBy = "deliveryPartner")
    private List<OrderDelivery> orderDeliveries;

    // getters and setters
}