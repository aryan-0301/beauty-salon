package com.darshu.salon.dto;

import lombok.*;

/**
 * DTO for Razorpay payment verification.
 */
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class PaymentVerification {
    private String razorpayPaymentId;
    private String razorpayOrderId;
    private String razorpaySignature;
}
