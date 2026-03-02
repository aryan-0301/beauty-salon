import { useCart } from '../context/CartContext';
import './CartItem.css';

/**
 * CartItem — a single line item in the cart with quantity controls.
 */
export default function CartItem({ item }) {
    const { updateQuantity, removeFromCart } = useCart();

    return (
        <div className="cart-item">
            <div className="cart-item-image">
                <img
                    src={item.imageUrl || 'https://placehold.co/80x80/f5e6d3/b8860b?text=Product'}
                    alt={item.name}
                />
            </div>
            <div className="cart-item-info">
                <h4>{item.name}</h4>
                <span className="cart-item-price">₹{item.price?.toLocaleString('en-IN')}</span>
            </div>
            <div className="cart-item-quantity">
                <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                    −
                </button>
                <span className="qty-value">{item.quantity}</span>
                <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                    +
                </button>
            </div>
            <div className="cart-item-total">
                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
            </div>
            <button
                className="cart-item-remove"
                onClick={() => removeFromCart(item.id)}
                title="Remove"
            >
                ✕
            </button>
        </div>
    );
}
