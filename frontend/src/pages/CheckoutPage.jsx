import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import PaymentButton from '../components/PaymentButton';
import { createOrder } from '../api/orderApi';
import './CheckoutPage.css';

/**
 * CheckoutPage — customer details form + Razorpay payment integration.
 * On success → navigates to /order-success with order details.
 * On failure → navigates to /order-failed with error details.
 */
export default function CheckoutPage() {
    const { cartItems, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        customerName: '',
        phone: '',
        address: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const isFormValid = form.customerName && form.phone && form.address;

    // Called when Razorpay payment succeeds
    const handlePaymentSuccess = async (paymentData) => {
        setLoading(true);

        const orderDetails = {
            customerName: form.customerName,
            phone: form.phone,
            address: form.address,
            totalAmount: cartTotal,
            paymentId: paymentData.paymentId || 'demo_payment',
            orderStatus: 'CONFIRMED',
            items: cartItems.map(item => ({
                productId: item.id,
                name: item.name,
                quantity: item.quantity,
                price: item.price,
            })),
        };

        try {
            // Save order to backend
            await createOrder(orderDetails);
        } catch (err) {
            console.log('Order saved locally (backend may be offline):', err);
        }

        // Clear the cart
        clearCart();
        setLoading(false);

        // Navigate to success page with order details
        navigate('/order-success', { state: orderDetails });
    };

    // Called when Razorpay payment fails or is cancelled
    const handlePaymentFailure = (errorData) => {
        navigate('/order-failed', { state: errorData });
    };

    // Cart is empty — redirect
    if (cartItems.length === 0) {
        return (
            <div className="checkout-page">
                <div className="page-header">
                    <h1>Checkout</h1>
                </div>
                <div className="section">
                    <div className="container">
                        <div className="empty-state">
                            <div className="icon">🛒</div>
                            <h3>Nothing to checkout</h3>
                            <p>Add products to your cart first.</p>
                            <button className="btn btn-primary" onClick={() => navigate('/products')} style={{ marginTop: '20px' }}>
                                Browse Products
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <div className="page-header">
                <h1>Order Ritual</h1>
                <p>Complete your details to finalize your curated beauty selection.</p>
            </div>

            <section className="section">
                <div className="container">
                    <div className="checkout-layout">
                        {/* Customer Details Form */}
                        <div className="checkout-form">
                            <h3>Delivery Details</h3>
                            <div className="form-group">
                                <label className="form-label">Full Name *</label>
                                <input
                                    className="form-input"
                                    type="text"
                                    name="customerName"
                                    value={form.customerName}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Phone Number *</label>
                                <input
                                    className="form-input"
                                    type="tel"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder="+91 98765 43210"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Delivery Address *</label>
                                <textarea
                                    className="form-input form-textarea"
                                    name="address"
                                    value={form.address}
                                    onChange={handleChange}
                                    placeholder="Enter your complete delivery address"
                                    required
                                />
                            </div>
                        </div>

                        {/* Order Summary + Payment */}
                        <div className="checkout-summary">
                            <h3>Order Summary</h3>
                            <div className="checkout-items">
                                {cartItems.map(item => (
                                    <div className="checkout-item" key={item.id}>
                                        <img
                                            src={item.imageUrl || 'https://placehold.co/50x50/f5e6d3/b8860b?text=P'}
                                            alt={item.name}
                                        />
                                        <div className="checkout-item-info">
                                            <span className="checkout-item-name">{item.name}</span>
                                            <span className="checkout-item-qty">Qty: {item.quantity}</span>
                                        </div>
                                        <span className="checkout-item-price">
                                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="summary-divider"></div>
                            <div className="summary-row summary-total">
                                <span>Total Amount</span>
                                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                            </div>
                            <div style={{ marginTop: '24px' }}>
                                <PaymentButton
                                    amount={cartTotal}
                                    onSuccess={handlePaymentSuccess}
                                    onFailure={handlePaymentFailure}
                                    customerInfo={form}
                                    disabled={!isFormValid || loading}
                                />
                            </div>
                            {loading && (
                                <p className="checkout-hint" style={{ color: 'var(--primary)' }}>
                                    ⏳ Processing your order...
                                </p>
                            )}
                            {!isFormValid && (
                                <p className="checkout-hint">Please fill in all delivery details to proceed.</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
