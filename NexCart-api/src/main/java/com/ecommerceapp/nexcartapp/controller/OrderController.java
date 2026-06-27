package com.ecommerceapp.nexcartapp.controller;

import com.ecommerceapp.nexcartapp.dto.OrderRequest;
import com.ecommerceapp.nexcartapp.exception.OrderNotFoundException;
import com.ecommerceapp.nexcartapp.exception.ProductNotFoundException;
import com.ecommerceapp.nexcartapp.exception.UserNotFoundException;
import com.ecommerceapp.nexcartapp.model.Order;
import com.ecommerceapp.nexcartapp.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OrderController {

    @Autowired
    OrderService orderService;

    @GetMapping("/order/{id}")
    public ResponseEntity<Order> getCategoryById(@PathVariable("id") Long id) throws OrderNotFoundException {
        return new ResponseEntity<>(orderService.getOrderById(id), HttpStatus.OK);
    }

    @PostMapping("/order")
    public ResponseEntity<Order> createCategory(@RequestBody OrderRequest orderRequest)
            throws UserNotFoundException, ProductNotFoundException {
        return new ResponseEntity<>(orderService.createOrder(orderRequest), HttpStatus.OK);
    }

    @GetMapping("/order/user/{id}")
    public ResponseEntity<List<Order>> getOrderByUser(@PathVariable("id") Long userId)
            throws UserNotFoundException {
        return new ResponseEntity<>(orderService.getOrdersByUser(userId), HttpStatus.OK);
    }

    @GetMapping("/order/payment-methods")
    public ResponseEntity<String[]> getPaymentMethods() {

        String[] methods = {
                "CASH_ON_DELIVERY",
                "ONLINE_PAYMENT"
        };

        return new ResponseEntity<>(methods, HttpStatus.OK);
    }

    @PutMapping("/order/{id}/mark-paid")
    public ResponseEntity<String> markPaid(@PathVariable Long id) throws OrderNotFoundException {
        orderService.markOrderPaid(id);
        return ResponseEntity.ok("Payment marked as PAID");
    }
}
