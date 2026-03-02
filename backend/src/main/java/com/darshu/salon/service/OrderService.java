package com.darshu.salon.service;

import com.darshu.salon.dto.OrderRequest;
import com.darshu.salon.entity.Order;
import com.darshu.salon.entity.OrderItem;
import com.darshu.salon.entity.Product;
import com.darshu.salon.repository.OrderRepository;
import com.darshu.salon.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * OrderService — handles order creation, listing, and stock updates.
 */
@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final ProductService productService;

    public OrderService(OrderRepository orderRepository,
                        ProductRepository productRepository,
                        ProductService productService) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.productService = productService;
    }

    /** Create an order and reduce stock for each item */
    @Transactional
    public Order createOrder(OrderRequest request) {
        Order order = Order.builder()
                .customerName(request.getCustomerName())
                .phone(request.getPhone())
                .address(request.getAddress())
                .totalAmount(request.getTotalAmount())
                .paymentId(request.getPaymentId())
                .orderStatus(request.getOrderStatus() != null ? request.getOrderStatus() : "CONFIRMED")
                .build();

        // Add order items and reduce stock
        if (request.getItems() != null) {
            for (OrderRequest.OrderItemRequest itemReq : request.getItems()) {
                Product product = productRepository.findById(itemReq.getProductId())
                        .orElse(null);

                OrderItem orderItem = OrderItem.builder()
                        .order(order)
                        .product(product)
                        .quantity(itemReq.getQuantity())
                        .price(itemReq.getPrice())
                        .build();

                order.getItems().add(orderItem);

                // Reduce stock
                if (product != null) {
                    productService.reduceStock(product.getId(), itemReq.getQuantity());
                }
            }
        }

        return orderRepository.save(order);
    }

    /** Get all orders */
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    /** Update order status */
    public Order updateOrderStatus(Long id, String status) {
        return orderRepository.findById(id).map(order -> {
            order.setOrderStatus(status);
            return orderRepository.save(order);
        }).orElseThrow(() -> new RuntimeException("Order not found: " + id));
    }
}
