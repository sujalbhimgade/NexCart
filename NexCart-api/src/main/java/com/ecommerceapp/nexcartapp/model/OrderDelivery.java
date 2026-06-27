package com.ecommerceapp.nexcartapp.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
public class OrderDelivery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderDeliveryId;

    @Column(nullable = false)
    private Date deliveryDate;

    @Enumerated(EnumType.STRING)
    private DeliveryStatus status; // Out for delivery, Delivered, Failed

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @ManyToOne
    @JoinColumn(name = "delivery_partner_id", nullable = false)
    private DeliveryPartner deliveryPartner;

    // ... other fields as needed

    // getters and setters
}