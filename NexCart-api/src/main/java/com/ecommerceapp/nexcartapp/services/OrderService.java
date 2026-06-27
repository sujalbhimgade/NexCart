package com.ecommerceapp.nexcartapp.services;


import com.ecommerceapp.nexcartapp.dto.OrderRequest;
import com.ecommerceapp.nexcartapp.exception.OrderNotFoundException;
import com.ecommerceapp.nexcartapp.exception.ProductNotFoundException;
import com.ecommerceapp.nexcartapp.exception.UserNotFoundException;
import com.ecommerceapp.nexcartapp.model.Order;
import com.ecommerceapp.nexcartapp.model.OrderStatus;


import java.util.List;

public interface OrderService {
    Order createOrder(OrderRequest order) throws UserNotFoundException, ProductNotFoundException;
    Order getOrderById(Long orderId) throws OrderNotFoundException;
    List<Order> getOrdersByUser(Long userId) throws UserNotFoundException;
    void cancelOrder(Long orderId) throws OrderNotFoundException;
    void confirmOrder(Long orderId);
    void updateOrderStatus(Long orderId, OrderStatus newStatus) throws OrderNotFoundException;
    void markOrderPaid(Long orderId) throws OrderNotFoundException;

}