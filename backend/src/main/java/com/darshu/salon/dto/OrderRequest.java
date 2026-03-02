package com.darshu.salon.dto;

import lombok.*;
import java.util.List;

/**
 * DTO for creating an order from the frontend.
 */
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class OrderRequest {

    private String customerName;
    private String phone;
    private String address;
    private Double totalAmount;
    private String paymentId;
    private String orderStatus;
    private List<OrderItemRequest> items;

    @Getter @Setter @NoArgsConstructor @AllArgsConstructor
    public static class OrderItemRequest {
        private Long productId;
        private Integer quantity;
        private Double price;
    }
}
