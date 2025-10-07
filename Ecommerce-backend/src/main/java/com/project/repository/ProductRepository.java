package com.project.repository;

import com.project.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, String> {
    Page<Product> findAllByCreatedById(String createdById,Pageable pageable);

    Page<Product> findAll(Pageable pageable);

    // Search products by name containing query (case-insensitive)
    List<Product> findByNameContainingIgnoreCase(String name);
}
