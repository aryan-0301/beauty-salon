import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

/**
 * ProductCard — premium display for a single product with animations.
 */
export default function ProductCard({ product, index }) {
    const { addToCart, cartItems } = useCart();
    const cartItem = cartItems.find(item => item.id === product.id);
    const inCart = !!cartItem;

    const handleAdd = (e) => {
        e.preventDefault();
        if (product.stock <= 0) return;
        addToCart(product);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="product-card"
        >
            <div className="product-card-visual">
                <div className="product-image-container">
                    <img
                        src={product.imageUrl || 'https://placehold.co/400x400/f5f5f0/8e735b?text=Darshu'}
                        alt={product.name}
                        className="product-image"
                        loading="lazy"
                    />
                </div>

                <div className="product-card-badges">
                    {product.stock <= 0 ? (
                        <span className="badge-sold-out">Sold Out</span>
                    ) : product.stock <= 5 ? (
                        <span className="badge-low-stock">Limited</span>
                    ) : null}
                </div>

                <div className="product-card-actions-overlay">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="action-btn-circle"
                        title="Quick View"
                    >
                        <Eye size={18} strokeWidth={1.5} />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`action-btn-circle ${inCart ? 'in-cart' : ''}`}
                        onClick={handleAdd}
                        disabled={product.stock <= 0}
                        title={inCart ? `Add another (${cartItem.quantity} already in cart)` : 'Add to Cart'}
                    >
                        <ShoppingBag size={18} strokeWidth={1.5} />
                    </motion.button>
                </div>
            </div>

            <div className="product-card-details">
                <div className="product-category">Boutique</div>
                <h3 className="product-name">{product.name}</h3>

                <div className="product-bottom">
                    <div className="product-price-tag">
                        <span className="currency">₹</span>
                        <span className="price-value">{product.price?.toLocaleString('en-IN')}</span>
                    </div>
                    <AnimatePresence>
                        {inCart && (
                            <motion.span
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                className="cart-qty-indicator"
                            >
                                {cartItem.quantity}
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
}
