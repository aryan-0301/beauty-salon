import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, MapPin, Phone, Mail, Clock, Flower2 } from 'lucide-react';
import './Footer.css';

/**
 * Footer — site-wide footer with a premium, minimalist design.
 */
export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    {/* Brand */}
                    <div className="footer-brand-section">
                        <Link to="/" className="footer-brand">
                            <Flower2 className="footer-logo" size={32} />
                            <div className="brand-text">
                                <span className="brand-name">DARSHU</span>
                                <span className="brand-sub">BEAUTY SALON</span>
                            </div>
                        </Link>
                        <p className="footer-description">
                            Crafting elegance and confidence through professional beauty artistry.
                            Your sanctuary for rejuvenation and timeless style.
                        </p>
                        <div className="footer-social-links">
                            <a href="#" className="social-icon" aria-label="Instagram"><Instagram size={18} /></a>
                            <a href="#" className="social-icon" aria-label="Facebook"><Facebook size={18} /></a>
                            <a href="#" className="social-icon" aria-label="YouTube"><Youtube size={18} /></a>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="footer-links-section">
                        <h4 className="footer-title">Studio</h4>
                        <ul className="footer-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/about">Our Story</Link></li>
                            <li><Link to="/services">Services</Link></li>
                            <li><Link to="/products">Boutique</Link></li>
                        </ul>
                    </div>

                    {/* Services Highlight */}
                    <div className="footer-links-section">
                        <h4 className="footer-title">Artistry</h4>
                        <ul className="footer-links">
                            <li><Link to="/services">Hair Couture</Link></li>
                            <li><Link to="/services">Skin Rituals</Link></li>
                            <li><Link to="/services">Master Makeup</Link></li>
                            <li><Link to="/services">Hand & Feet</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="footer-contact-section">
                        <h4 className="footer-title">Visit Us</h4>
                        <ul className="footer-info-list">
                            <li>
                                <MapPin size={16} className="info-icon" />
                                <span>123 Elegance Way, Suite 101, City</span>
                            </li>
                            <li>
                                <Phone size={16} className="info-icon" />
                                <span>+91 98902 92184</span>
                            </li>
                            <li>
                                <Mail size={16} className="info-icon" />
                                <span>studio@darshusalon.com</span>
                            </li>
                            <li>
                                <Clock size={16} className="info-icon" />
                                <span>Mon – Sat: 10:00 – 20:00</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="copyright">
                        © {new Date().getFullYear()} DARSHU BEAUTY SALON. BORN FROM ELEGANCE.
                    </p>
                </div>
            </div>
        </footer>
    );
}
