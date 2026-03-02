import { useState } from 'react';
import './ContactPage.css';

/**
 * ContactPage — contact form, phone, address, and embedded Google Map.
 */
export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In production, this would send to a backend endpoint
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
        setForm({ name: '', email: '', phone: '', message: '' });
    };

    return (
        <div className="contact-page">
            <div className="page-header">
                <h1>Contact Us</h1>
                <p>We'd love to hear from you. Get in touch with our team.</p>
            </div>

            <section className="section">
                <div className="container">
                    <div className="contact-grid">
                        {/* Contact Info */}
                        <div className="contact-info">
                            <h2>Get in Touch</h2>
                            <p className="contact-intro">
                                Whether you want to book an appointment, ask about our products, or just say hello — we're here for you.
                            </p>

                            <div className="contact-details">
                                <div className="contact-item">
                                    <span className="contact-icon">📍</span>
                                    <div>
                                        <h4>Visit Us</h4>
                                        <p>123 Beauty Street, Near City Center, Mumbai, Maharashtra 400001</p>
                                    </div>
                                </div>
                                <div className="contact-item">
                                    <span className="contact-icon">📞</span>
                                    <div>
                                        <h4>Call Us</h4>
                                        <p>+91 98765 43210</p>
                                    </div>
                                </div>
                                <div className="contact-item">
                                    <span className="contact-icon">✉</span>
                                    <div>
                                        <h4>Email Us</h4>
                                        <p>info@darshubeauty.com</p>
                                    </div>
                                </div>
                                <div className="contact-item">
                                    <span className="contact-icon">⏰</span>
                                    <div>
                                        <h4>Working Hours</h4>
                                        <p>Monday – Saturday: 10:00 AM – 8:00 PM<br />Sunday: Closed</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="contact-form-wrapper">
                            <h3>Send Us a Message</h3>
                            {submitted && (
                                <div className="form-success">
                                    ✅ Thank you! Your message has been sent successfully.
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label className="form-label">Your Name</label>
                                    <input
                                        className="form-input"
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                        required
                                    />
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label className="form-label">Email</label>
                                        <input
                                            className="form-input"
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            placeholder="your@email.com"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Phone</label>
                                        <input
                                            className="form-input"
                                            type="tel"
                                            name="phone"
                                            value={form.phone}
                                            onChange={handleChange}
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Message</label>
                                    <textarea
                                        className="form-input form-textarea"
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        placeholder="How can we help you?"
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Google Map */}
            <section className="map-section">
                <iframe
                    title="Darshu Beauty Salon Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709657!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1680000000000"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </section>
        </div>
    );
}
