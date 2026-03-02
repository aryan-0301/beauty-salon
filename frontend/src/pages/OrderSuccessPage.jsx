import { useLocation, useNavigate, Link } from 'react-router-dom';
import './OrderSuccessPage.css';

/**
 * OrderSuccessPage — shown after a successful Razorpay payment.
 * Receives order details via React Router location state.
 */
export default function OrderSuccessPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const order = location.state || {};

    return (
        <div className="order-success-page">
            <div className="page-header success-header">
                <h1>Order Confirmed! 🎉</h1>
                <p>Your payment was successful</p>
            </div>

            <section className="section">
                <div className="container">
                    <div className="success-card animate-fade-in-up">
                        {/* Animated checkmark */}
                        <div className="checkmark-circle">
                            <svg className="checkmark-svg" viewBox="0 0 52 52">
                                <circle className="checkmark-circle-bg" cx="26" cy="26" r="25" fill="none" />
                                <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                            </svg>
                        </div>

                        <h2>Thank You{order.customerName ? `, ${order.customerName}` : ''}!</h2>
                        <p className="success-message">
                            Your order has been placed successfully. We'll prepare and deliver your products soon.
                        </p>

                        {/* Order Details */}
                        <div className="order-details-card">
                            {order.paymentId && (
                                <div className="detail-row">
                                    <span className="detail-label">Payment ID</span>
                                    <span className="detail-value"><code>{order.paymentId}</code></span>
                                </div>
                            )}
                            {order.totalAmount && (
                                <div className="detail-row">
                                    <span className="detail-label">Amount Paid</span>
                                    <span className="detail-value highlight">₹{Number(order.totalAmount).toLocaleString('en-IN')}</span>
                                </div>
                            )}
                            {order.customerName && (
                                <div className="detail-row">
                                    <span className="detail-label">Name</span>
                                    <span className="detail-value">{order.customerName}</span>
                                </div>
                            )}
                            {order.phone && (
                                <div className="detail-row">
                                    <span className="detail-label">Phone</span>
                                    <span className="detail-value">{order.phone}</span>
                                </div>
                            )}
                            {order.address && (
                                <div className="detail-row">
                                    <span className="detail-label">Delivery Address</span>
                                    <span className="detail-value">{order.address}</span>
                                </div>
                            )}
                            <div className="detail-row">
                                <span className="detail-label">Status</span>
                                <span className="badge badge-success">CONFIRMED</span>
                            </div>
                        </div>

                        {/* Items ordered */}
                        {order.items && order.items.length > 0 && (
                            <div className="ordered-items">
                                <h4>Items Ordered</h4>
                                {order.items.map((item, idx) => (
                                    <div className="ordered-item" key={idx}>
                                        <span>{item.name} × {item.quantity}</span>
                                        <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="success-actions">
                            <Link to="/" className="btn btn-primary">
                                Back to Home
                            </Link>
                            <Link to="/products" className="btn btn-secondary">
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
