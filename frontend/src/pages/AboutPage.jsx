import './AboutPage.css';

/**
 * AboutPage — salon story, values, and team information.
 */
export default function AboutPage() {
    return (
        <div className="about-page">
            <div className="page-header">
                <h1>Our Story</h1>
                <p>Learn more about our passion for beauty and care.</p>
            </div>

            {/* Story */}
            <section className="section">
                <div className="container">
                    <div className="about-story-grid">
                        <div className="about-story-content">
                            <span className="section-tag">Our Story</span>
                            <h2>A Legacy of Beauty & Care</h2>
                            <p>
                                Darshu Beauty Salon was founded with a simple yet powerful vision — to create
                                a space where beauty meets self-care. What started as a small studio has grown
                                into one of the most trusted salons in the city, serving thousands of happy clients.
                            </p>
                            <p>
                                Our founder, <strong>Darshu</strong>, with over 10 years of experience in the
                                beauty industry, has built a team of skilled professionals who share her passion
                                for making people look and feel their best. Every service we offer is crafted
                                with care, using premium products and modern techniques.
                            </p>
                            <p>
                                We believe beauty is not just about appearances — it's about confidence,
                                self-expression, and well-being. That's why we focus on personalized experiences
                                that cater to your unique beauty needs.
                            </p>
                        </div>
                        <div className="about-visual">
                            <span>🌸</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section about-values">
                <div className="container">
                    <h2 className="section-title">What We Stand For</h2>
                    <div className="section-divider"></div>
                    <div className="grid grid-3">
                        <div className="value-card">
                            <div className="value-icon">🌟</div>
                            <h3>Excellence</h3>
                            <p>We use only the best products and techniques, ensuring top-quality results every time you visit us.</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon">💝</div>
                            <h3>Care</h3>
                            <p>Your comfort and satisfaction are our top priority. Every service is personalized to your needs.</p>
                        </div>
                        <div className="value-card">
                            <div className="value-icon">🌿</div>
                            <h3>Natural Beauty</h3>
                            <p>We enhance your natural beauty without compromise, using gentle and organic products wherever possible.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="section">
                <div className="container">
                    <h2 className="section-title">Why Choose Darshu?</h2>
                    <div className="section-divider"></div>
                    <div className="why-grid">
                        <div className="why-item">
                            <span className="why-icon">✅</span>
                            <div>
                                <h4>Experienced Team</h4>
                                <p>Our stylists and beauticians have years of training and industry experience.</p>
                            </div>
                        </div>
                        <div className="why-item">
                            <span className="why-icon">✅</span>
                            <div>
                                <h4>Premium Products</h4>
                                <p>We use only trusted, high-quality brands for all our services and retail.</p>
                            </div>
                        </div>
                        <div className="why-item">
                            <span className="why-icon">✅</span>
                            <div>
                                <h4>Hygienic Environment</h4>
                                <p>We maintain the highest hygiene standards for a safe and comfortable experience.</p>
                            </div>
                        </div>
                        <div className="why-item">
                            <span className="why-icon">✅</span>
                            <div>
                                <h4>Affordable Pricing</h4>
                                <p>Premium quality at prices that won't break the bank. Beauty for everyone.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
