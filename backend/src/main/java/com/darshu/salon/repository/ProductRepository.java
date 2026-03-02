package com.darshu.salon.repository;

import com.darshu.salon.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * ProductRepository — data access for Product entities.
 */
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
}
