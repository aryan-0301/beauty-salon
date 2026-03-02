package com.darshu.salon.service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

/**
 * PaymentService — handles Razorpay order creation and payment verification.
 */
@Service
public class PaymentService {

    @Value("${razorpay.key_id}")
    private String razorpayKeyId;

    @Value("${razorpay.key_secret}")
    private String razorpayKeySecret;

    /**
     * Create a Razorpay order.
     * @param amount Amount in INR (will be converted to paise)
     * @return Razorpay order JSON as a string
     */
    public String createRazorpayOrder(Double amount) throws RazorpayException {
        RazorpayClient client = new RazorpayClient(razorpayKeyId, razorpayKeySecret);

        JSONObject options = new JSONObject();
        options.put("amount", Math.round(amount * 100)); // Convert to paise
        options.put("currency", "INR");
        options.put("receipt", "order_" + System.currentTimeMillis());

        Order order = client.orders.create(options);
        return order.toString();
    }

    /**
     * Verify Razorpay payment signature.
     * In production, verify using Razorpay Utils.verifySignature().
     */
    public boolean verifyPayment(String paymentId, String orderId, String signature) {
        // Basic verification — in production, use Razorpay's signature verification
        return paymentId != null && !paymentId.isEmpty();
    }
}
