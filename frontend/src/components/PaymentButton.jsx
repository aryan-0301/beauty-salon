/**
 * PaymentButton — triggers Razorpay checkout popup.
 * Props: amount (in INR), onSuccess, onFailure callbacks, customerInfo.
 */
export default function PaymentButton({ amount, onSuccess, onFailure, customerInfo, disabled }) {
    const handlePayment = () => {
        if (!window.Razorpay) {
            alert('Razorpay SDK failed to load. Please check your connection.');
            return;
        }

        const options = {
            key: 'rzp_test_SM33QLRIjoFWJG',
            amount: Math.round(amount * 100), // Razorpay expects amount in paise
            currency: 'INR',
            name: 'Darshu Beauty Salon',
            description: 'Product Purchase',

            // Called when payment succeeds
            handler: function (response) {
                onSuccess({
                    paymentId: response.razorpay_payment_id,
                    orderId: response.razorpay_order_id,
                    signature: response.razorpay_signature,
                });
            },

            prefill: {
                name: customerInfo?.customerName || '',
                contact: customerInfo?.phone || '',
            },

            theme: {
                color: '#ff4d6d',
            },

            // Allow all test payment methods
            modal: {
                ondismiss: function () {
                    // User closed the popup without paying
                    if (onFailure) {
                        onFailure({
                            reason: 'Payment was cancelled. You closed the payment window before completing the transaction.',
                            code: 'PAYMENT_CANCELLED',
                            description: 'User dismissed the payment popup',
                        });
                    }
                },
            },
        };

        const rzp = new window.Razorpay(options);

        // Handle payment failures from Razorpay
        rzp.on('payment.failed', function (response) {
            if (onFailure) {
                onFailure({
                    reason: response.error?.description || 'Payment failed. Please try again.',
                    code: response.error?.code || 'PAYMENT_FAILED',
                    description: response.error?.reason || 'Unknown error',
                });
            }
        });

        rzp.open();
    };

    return (
        <button
            className="btn btn-primary btn-lg"
            onClick={handlePayment}
            disabled={disabled}
            style={{ width: '100%' }}
        >
            💳 Pay ₹{amount?.toLocaleString('en-IN')} with Razorpay
        </button>
    );
}
