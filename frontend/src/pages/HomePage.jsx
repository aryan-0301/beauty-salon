import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Star, Quote, Send, MapPin, Phone, Mail, Instagram, Facebook, Youtube } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import ProductCard from '../components/ProductCard';
import { getAllProducts } from '../api/productApi';
import './HomePage.css';

const featuredServices = [
    { icon: '💇‍♀️', name: 'Hair Couture', description: 'Expert cuts, architectural coloring, and bespoke styling treatments.', price: '1,200' },
    { icon: '💆‍♀️', name: 'Skin Rituals', description: 'Rejuvenating facial experiences for ethereal, luminous skin.', price: '2,500' },
    { icon: '💅', name: 'Hand & Feet', description: 'Sophisticated nail artistry with premium non-toxic elixirs.', price: '800' },
    { icon: '👰', name: 'Master Makeup', description: 'Editorial-grade bridal and occasion makeup for your defining moments.', price: '8,000' },
];

const testimonials = [
    { name: "Elena Gilbert", role: "Vogue Contributor", content: "The level of artistry at Darshu is simply unmatched. It's not just a salon; it's a sanctuary for the modern woman who values elegance." },
    { name: "Sanya Malhotra", role: "Fashion Designer", content: "I've visited salons across Milan and Paris, but the personalized care and botanical rituals here are truly world-class." },
    { name: "Ria Sharma", role: "Creative Director", content: "Every visit leaves me feeling completely transformed. The attention to detail and professional excellence is breathtaking." }
];

export default function HomePage() {
    const [products, setProducts] = useState([]);
    const { scrollYProgress } = useScroll();
    const yHero = useTransform(scrollYProgress, [0, 0.2], [0, 200]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await getAllProducts();
                setProducts(res.data.slice(0, 4)); // Show top 4 products
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();

        // Handle initial hash scroll
        if (window.location.hash) {
            const id = window.location.hash.substring(1);
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            }, 500); // Small delay to account for content loading
        }
    }, []);

    const handleBookAppointment = (service = 'General Consultation') => {
        window.dispatchEvent(new CustomEvent('open-booking', { detail: { service } }));
    };

    return (
        <div className="home-page">
            {/* HERO SECTION */}
            <section id="home" className="hero-section">
                <motion.div style={{ y: yHero, opacity: opacityHero }} className="hero-background">
                    <div className="hero-overlay"></div>
                    {/* Placeholder for a high-res salon image */}
                    <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1974" alt="Premium Salon Interior" className="hero-img" />
                </motion.div>

                <div className="container hero-container">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="hero-content"
                    >
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="hero-tagline"
                        >
                            The Pinnacle of Beauty Artistry
                        </motion.span>
                        <h1 className="hero-title">
                            Where <i>Grace</i> Meets <br /> Professional Mastery.
                        </h1>
                        <p className="hero-description">
                            Experience a sanctuary of quiet luxury. We harmonize botanical science
                            with elite technique to unveil your most radiant self.
                        </p>
                        <div className="hero-actions">
                            <button className="btn btn-primary" onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}>
                                Explore Services
                            </button>
                            <button className="btn btn-outline" onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}>
                                Our Story
                            </button>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="scroll-indicator"
                >
                    <div className="mouse">
                        <div className="wheel"></div>
                    </div>
                </motion.div>
            </section>

            {/* SERVICES SECTION */}
            <section id="services" className="section services-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-label">Our Curation</span>
                        <h2 className="section-title">The Art of <i>Artistry</i></h2>
                        <div className="section-line"></div>
                    </div>

                    <div className="services-grid">
                        {featuredServices.map((service, index) => (
                            <ServiceCard key={index} service={service} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ABOUT SECTION */}
            <section id="about" className="section about-section">
                <div className="container">
                    <div className="about-grid">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="about-image-side"
                        >
                            <div className="experience-badge">
                                <span className="years">15+</span>
                                <span className="text">Years of <br /> Excellence</span>
                            </div>
                            <img src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&q=80&w=1470" alt="Specialist at work" className="about-img-main" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="about-text-side"
                        >
                            <span className="section-label">A Legacy of Beauty</span>
                            <h2 className="about-title">Crafting <i>Radiance</i> <br /> Since Day One.</h2>
                            <p className="about-para">
                                At Darshu, we don't just provide services; we curate experiences.
                                Founded with a vision to merge traditional botanical wisdom with high-performance
                                artistry, we have become the preferred sanctuary for those who seek
                                sophistication in their beauty rituals.
                            </p>
                            <div className="about-stats">
                                <div className="stat-item">
                                    <span className="stat-num">50k+</span>
                                    <span className="stat-label">Happy Clients</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-num">20+</span>
                                    <span className="stat-label">Expert Artists</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-num">100%</span>
                                    <span className="stat-label">Botanical Products</span>
                                </div>
                            </div>
                            <div className="about-actions">
                                <button className="btn btn-primary" onClick={() => handleBookAppointment('Full Salon Experience')}>Learn More About Us</button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* PRODUCTS/BOUTIQUE SECTION */}
            <section id="products" className="section products-section">
                <div className="container">
                    <div className="section-header center">
                        <span className="section-label">The Boutique</span>
                        <h2 className="section-title">Bring the <i>Ritual</i> Home</h2>
                        <p className="section-desc">Our master-curated selection of elite beauty elixirs.</p>
                    </div>

                    <div className="products-grid">
                        {products.length > 0 ? (
                            products.map((product, index) => (
                                <ProductCard key={product.id} product={product} index={index} />
                            ))
                        ) : (
                            <p className="loading-text">Curating our collection...</p>
                        )}
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS SECTION */}
            <section className="section testimonials-section">
                <div className="container">
                    <div className="testimonials-grid">
                        {testimonials.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="testimonial-card"
                            >
                                <Quote className="quote-icon" size={32} />
                                <p className="testimonial-content">"{item.content}"</p>
                                <div className="testimonial-footer">
                                    <div className="star-rating">
                                        {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="var(--primary)" color="var(--primary)" />)}
                                    </div>
                                    <h4 className="client-name">{item.name}</h4>
                                    <span className="client-role">{item.role}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="section contact-section">
                <div className="container">
                    <div className="contact-grid">
                        <div className="contact-info">
                            <span className="section-label">Get in Touch</span>
                            <h2 className="contact-title">Visit the <i>Sanctuary</i>.</h2>
                            <p className="contact-para">
                                Whether you're seeking a total transformation or a moment of zen,
                                our doors are always open for you.
                            </p>

                            <div className="contact-details">
                                <div className="detail-item">
                                    <MapPin className="detail-icon" size={20} alt="Address" />
                                    <div>
                                        <h4>Our Location</h4>
                                        <p>123 Elegance Way, Design District, Mumbai 400001</p>
                                    </div>
                                </div>
                                <div className="detail-item">
                                    <Phone className="detail-icon" size={20} alt="Phone" />
                                    <div>
                                        <h4>Call Us</h4>
                                        <p>+91 98902 92184</p>
                                    </div>
                                </div>
                                <div className="detail-item">
                                    <Mail className="detail-icon" size={20} alt="Email" />
                                    <div>
                                        <h4>Direct Inquiries</h4>
                                        <p>studio@darshusalon.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="contact-form-container">
                            <form className="contact-form" onSubmit={(e) => { e.preventDefault(); handleBookAppointment(); }}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">Name</label>
                                        <input type="text" className="form-input" placeholder="Your name" required />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Email</label>
                                        <input type="email" className="form-input" placeholder="your@email.com" required />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Service of Interest</label>
                                    <select className="form-input">
                                        <option>Haircut & Styling</option>
                                        <option>Botanical Facial</option>
                                        <option>Bridal Ritual</option>
                                        <option>Nail Artistry</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Message</label>
                                    <textarea className="form-input form-textarea" placeholder="How can we help you look and feel your best?" rows="4"></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Send Message</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
