package com.ecommerceapp.nexcartapp.services.impl;


import com.ecommerceapp.nexcartapp.dto.OrderItemRequest;
import com.ecommerceapp.nexcartapp.dto.OrderRequest;
import com.ecommerceapp.nexcartapp.exception.OrderNotFoundException;
import com.ecommerceapp.nexcartapp.exception.ProductNotFoundException;
import com.ecommerceapp.nexcartapp.exception.UserNotFoundException;
import com.ecommerceapp.nexcartapp.model.*;
import com.ecommerceapp.nexcartapp.repository.OrderItemRepository;
import com.ecommerceapp.nexcartapp.repository.OrderRepository;
import com.ecommerceapp.nexcartapp.repository.ProductRepository;
import com.ecommerceapp.nexcartapp.repository.UserRepository;
import com.ecommerceapp.nexcartapp.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private OrderItemRepository orderItemRepository;

    // ... other repositories as needed

    @Override
    public Order createOrder(OrderRequest orderRequest) throws UserNotFoundException, ProductNotFoundException {
        User user = userRepository.findById(orderRequest.getUserId()).orElseThrow(() -> new UserNotFoundException("User not found"));

        // Calculate total amount
        BigDecimal totalAmount = calculateTotalAmount(orderRequest);

        // Check product availability
        checkProductAvailability(orderRequest);

        Order order = new Order();
        if ("CASH_ON_DELIVERY".equalsIgnoreCase(orderRequest.getPaymentMethod())) {

            order.setPaymentMethod(PaymentMethod.CASH_ON_DELIVERY);
            order.setPaymentStatus(PaymentStatus.PENDING);

        }
        else {

            order.setPaymentMethod(PaymentMethod.ONLINE_PAYMENT);
            order.setPaymentStatus(PaymentStatus.PAID);

        }
        order.setOrderDate(new Date());
        order.setUser(user);
        order.setOrderStatus(OrderStatus.CONFIRMED);
        order.setTotalAmount(totalAmount);
        order.setShippingAddress(orderRequest.getShippingAddress());
        Order savedOrder = orderRepository.save(order);

        List<OrderItem> orderItemList = new ArrayList<>();
        for(OrderItemRequest orderItemRequest: orderRequest.getOrderItems()){
            OrderItem orderItem = new OrderItem();
            Product product =  productRepository.findById(orderItemRequest.getProductId()).orElseThrow(() -> new ProductNotFoundException("No Product Found with id:"+orderItemRequest.getProductId()));

            orderItem.setProduct(product);
            orderItem.setQuantity(orderItemRequest.getQuantity());
            orderItem.setOrder(savedOrder);

            OrderItem savedOrderItem = orderItemRepository.save(orderItem);
            orderItemList.add(savedOrderItem);

        }

        order.setOrderItems(orderItemList);




        // Create order and order items


        // Update product stock
//        updateProductStock(order);

        // Create payment (if applicable)
        // ...

        // Send order confirmation email
        // ...
        order.setOrderItems(orderItemList);
        savedOrder = orderRepository.save(order);
        return savedOrder;
    }


    private BigDecimal calculateTotalAmount(OrderRequest orderRequest) throws ProductNotFoundException {
        BigDecimal totalAmount=BigDecimal.ZERO;
        for(OrderItemRequest orderItemRequest: orderRequest.getOrderItems()){
            Product product =  productRepository.findById(orderItemRequest.getProductId()).orElseThrow(() -> new ProductNotFoundException("No Product Found with id:"+orderItemRequest.getProductId()));
            totalAmount = BigDecimal.valueOf( orderItemRequest.getQuantity()).multiply(product.getPrice()).add(totalAmount);
        }
        return totalAmount;
        // Logic to calculate total amount based on order items
    }

    private void checkProductAvailability(OrderRequest orderRequest) {
        // Logic to check product availability based on order items
    }

    @Override
    public Order getOrderById(Long orderId) throws OrderNotFoundException {
        return orderRepository.findById(orderId).orElseThrow(() -> new OrderNotFoundException("No Order found with id: "+orderId));
    }

    @Override
    public List<Order> getOrdersByUser(Long userId) throws UserNotFoundException {
        return userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("No User found with id: "+userId))
                .getOrders();


    }


    @Override
    public void cancelOrder(Long orderId) throws OrderNotFoundException {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new OrderNotFoundException("Order not found"));
        order.setOrderStatus(OrderStatus.CANCELED);
        orderRepository.save(order);
    }

    @Override
    public void confirmOrder(Long orderId) {
        // Implement logic to confirm order, e.g., update stock, create delivery order
    }

    @Override
    public void updateOrderStatus(Long orderId, OrderStatus newStatus) throws OrderNotFoundException {
        Order order = orderRepository.findById(orderId).orElseThrow(() -> new OrderNotFoundException("Order not found"));
        order.setOrderStatus(newStatus);
        orderRepository.save(order);
    }

    @Override
    public void markOrderPaid(Long orderId) throws OrderNotFoundException {

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new OrderNotFoundException("Order not found"));

        order.setPaymentStatus(PaymentStatus.PAID);

        orderRepository.save(order);
    }
}