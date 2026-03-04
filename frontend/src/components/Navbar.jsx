import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, User, Menu, X, Flower2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import authService from '../api/authService';
import './Navbar.css';

/**
 * Navbar — premium responsive navigation with scroll-aware styling.
 */
export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { cartCount } = useCart();
    const location = useLocation();
    const navigate = useNavigate();
    const user = authService.getCurrentUser();

    // Handle scroll for transparent -> solid transition
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        authService.logout();
        navigate('/');
    };

    const navLinks = [
        { path: '/', label: 'Home', isAnchor: true },
        { path: '/services', label: 'Services', isAnchor: true },
        { path: '/products', label: 'Products', isAnchor: true },
        { path: '/about', label: 'About', isAnchor: true },
        { path: '/contact', label: 'Contact', isAnchor: true },
    ];

    const isHomePage = location.pathname === '/';

    const handleLinkClick = (e, link) => {
        if (isHomePage && link.isAnchor) {
            setMenuOpen(false);
            const element = document.getElementById(link.label.toLowerCase());
            if (element) {
                e.preventDefault();
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            setMenuOpen(false);
        }
    };

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${menuOpen ? 'menu-active' : ''} ${!isHomePage ? 'not-home' : ''}`}>
            <div className="container navbar-inner">
                <Link to="/" className="navbar-brand" onClick={(e) => isHomePage && window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="brand-content"
                    >
                        <Flower2 className="brand-logo-icon" size={28} />
                        <div className="brand-text">
                            <span className="brand-name">DARSHU</span>
                            <span className="brand-sub">BEAUTY SALON</span>
                        </div>
                    </motion.div>
                </Link>

                <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
                    {navLinks.map((link, index) => (
                        <motion.li
                            key={link.path}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * index, duration: 0.5 }}
                        >
                            <Link
                                to={link.path}
                                className={`nav-link ${(!link.isAnchor && location.pathname === link.path) ? 'active' : ''}`}
                                onClick={(e) => handleLinkClick(e, link)}
                            >
                                {link.label}
                                <span className="link-underline"></span>
                            </Link>
                        </motion.li>
                    ))}
                    {user && user.role === 'ADMIN' && (
                        <motion.li
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                        >
                            <Link to="/admin/dashboard" className="nav-link">Admin Panel</Link>
                        </motion.li>
                    )}
                </ul>
                <button className="navbar-btn btn btn-primary" onClick={() => window.dispatchEvent(new CustomEvent('open-booking'))}>Book Appointment</button>

                <div className="navbar-actions">
                    <Link to="/cart" className="action-icon cart-trigger" title="Cart">
                        <ShoppingBag size={20} strokeWidth={1.5} />
                        <AnimatePresence>
                            {cartCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    className="cart-badge"
                                >
                                    {cartCount}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </Link>
                    {user ? (
                        <div className="user-nav-group">
                            <span className="user-name-label">{user.name.split(' ')[0]}</span>
                            <button onClick={handleLogout} className="action-icon-btn" title="Logout">
                                <X size={20} strokeWidth={1.5} />
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="action-icon" title="Login">
                            <User size={20} strokeWidth={1.5} />
                        </Link>
                    )}
                    <button
                        className="hamburger-trigger"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>
        </nav>
    );
}
