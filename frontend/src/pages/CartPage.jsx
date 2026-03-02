import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import './CartPage.css';

/**
 * CartPage — displays cart items with total and checkout button.
 */
export default function CartPage() {
    const { cartItems, cartTotal, clearCart } = useCart();

    if (cartItems.length === 0) {
        return (
            <div className="cart-page">
                <div className="page-header">
                    <h1>Your Cart</h1>
                    <p>Review your selected products</p>
                </div>
                <div className="section">
                    <div className="container">
                        <div className="empty-state">
                            <div className="icon">🛒</div>
                            <h3>Your cart is empty</h3>
                            <p>Browse our products and add items to your cart to get started.</p>
                            <Link to="/products" className="btn btn-primary" style={{ marginTop: '20px' }}>
                                Browse Products
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="page-header">
                <h1>Your Cart</h1>
                <p>{cartItems.length} item{cartItems.length > 1 ? 's' : ''} in your cart</p>
            </div>

            <section className="section">
                <div className="container">
                    <div className="cart-layout">
                        <div className="cart-items">
                            {cartItems.map(item => (
                                <CartItem key={item.id} item={item} />
                            ))}
                            <button className="btn btn-sm btn-danger" onClick={clearCart} style={{ marginTop: '12px' }}>
                                Clear Cart
                            </button>
                        </div>

                        <div className="cart-summary">
                            <h3>Order Summary</h3>
                            <div className="summary-rows">
                                {cartItems.map(item => (
                                    <div className="summary-row" key={item.id}>
                                        <span>{item.name} × {item.quantity}</span>
                                        <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="summary-divider"></div>
                            <div className="summary-row summary-total">
                                <span>Total</span>
                                <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                            </div>
                            <Link to="/checkout" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '20px' }}>
                                Proceed to Checkout →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
