import { useLocation, Link } from 'react-router-dom';
import './OrderFailedPage.css';

/**
 * OrderFailedPage — shown when a payment fails or is cancelled by the user.
 * Receives error details via React Router location state.
 */
export default function OrderFailedPage() {
    const location = useLocation();
    const error = location.state || {};

    return (
        <div className="order-failed-page">
            <div className="page-header failed-header">
                <h1>Payment Failed</h1>
                <p>Something went wrong with your payment</p>
            </div>

            <section className="section">
                <div className="container">
                    <div className="failed-card animate-fade-in-up">
                        {/* Error icon */}
                        <div className="error-circle">
                            <svg className="error-svg" viewBox="0 0 52 52">
                                <circle className="error-circle-bg" cx="26" cy="26" r="25" fill="none" />
                                <path className="error-x error-x-1" fill="none" d="M16 16 36 36" />
                                <path className="error-x error-x-2" fill="none" d="M36 16 16 36" />
                            </svg>
                        </div>

                        <h2>Payment Unsuccessful</h2>
                        <p className="failed-message">
                            {error.reason || 'Your payment could not be processed. This could be due to a cancelled transaction, network issue, or insufficient funds.'}
                        </p>

                        {error.code && (
                            <div className="error-details">
                                <div className="detail-row">
                                    <span className="detail-label">Error Code</span>
                                    <span className="detail-value"><code>{error.code}</code></span>
                                </div>
                                {error.description && (
                                    <div className="detail-row">
                                        <span className="detail-label">Description</span>
                                        <span className="detail-value">{error.description}</span>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="failed-tips">
                            <h4>💡 What you can do:</h4>
                            <ul>
                                <li>Check your internet connection and try again</li>
                                <li>Make sure you have sufficient balance in your account</li>
                                <li>Try a different payment method (UPI, card, or netbanking)</li>
                                <li>Contact us at <strong>+91 98765 43210</strong> for help</li>
                            </ul>
                        </div>

                        <div className="failed-actions">
                            <Link to="/checkout" className="btn btn-primary btn-lg">
                                🔄 Try Again
                            </Link>
                            <Link to="/cart" className="btn btn-secondary">
                                Back to Cart
                            </Link>
                            <Link to="/" className="btn btn-secondary">
                                Go Home
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
