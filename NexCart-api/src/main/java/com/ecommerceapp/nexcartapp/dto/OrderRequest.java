package com.ecommerceapp.nexcartapp.dto;

import com.ecommerceapp.nexcartapp.model.Address;
import lombok.Data;

import java.util.List;

@Data
public class OrderRequest {

    private Long userId;

    private Address shippingAddress;

    private List<OrderItemRequest> orderItems;

    private String paymentMethod;
}