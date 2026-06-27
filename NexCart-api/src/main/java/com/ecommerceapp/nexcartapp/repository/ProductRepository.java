package com.ecommerceapp.nexcartapp.repository;

import com.ecommerceapp.nexcartapp.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p WHERE LOWER(p.name) LIKE %:name%")
    List<Product> findByNameLike(@Param("name") String name);
}
