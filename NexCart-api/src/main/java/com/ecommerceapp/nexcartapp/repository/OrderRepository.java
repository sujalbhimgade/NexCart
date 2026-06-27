package com.ecommerceapp.nexcartapp.repository;

import com.ecommerceapp.nexcartapp.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {



//    List<Order> findByUserId(Long userId);
}
