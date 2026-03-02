package com.darshu.salon.controller;

import com.darshu.salon.dto.PaymentRequest;
import com.darshu.salon.dto.PaymentVerification;
import com.darshu.salon.service.PaymentService;
import com.razorpay.RazorpayException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * PaymentController — REST API for Razorpay payment integration.
 */
@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "*")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    /** POST /api/payment/create — Create a Razorpay order */
    @PostMapping("/create")
    public ResponseEntity<?> createPaymentOrder(@RequestBody PaymentRequest request) {
        try {
            String order = paymentService.createRazorpayOrder(request.getAmount());
            return ResponseEntity.ok(order);
        } catch (RazorpayException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Failed to create payment order: " + e.getMessage()));
        }
    }

    /** POST /api/payment/verify — Verify a Razorpay payment */
    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(@RequestBody PaymentVerification verification) {
        boolean isValid = paymentService.verifyPayment(
                verification.getRazorpayPaymentId(),
                verification.getRazorpayOrderId(),
                verification.getRazorpaySignature()
        );

        if (isValid) {
            return ResponseEntity.ok(Map.of("status", "verified", "message", "Payment verified successfully"));
        } else {
            return ResponseEntity.badRequest()
                    .body(Map.of("status", "failed", "message", "Payment verification failed"));
        }
    }
}
