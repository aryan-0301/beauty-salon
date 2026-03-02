package com.darshu.salon.repository;

import com.darshu.salon.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * OrderRepository — data access for Order entities.
 */
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
}
