package com.darshu.salon.dto;

import lombok.*;

/**
 * DTO for Razorpay payment creation request.
 */
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class PaymentRequest {
    private Double amount;
}
