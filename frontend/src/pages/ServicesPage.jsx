import { useState } from 'react';
import ServiceCard from '../components/ServiceCard';
import './ServicesPage.css';

const services = [
    { icon: '💇‍♀️', name: 'Haircut & Styling', description: 'Professional cuts, blowouts, and styling for men and women. From classic to trendy, we create the perfect look.', price: '500' },
    { icon: '🎨', name: 'Hair Coloring', description: 'Full color, highlights, balayage, ombre, and more. Transform your look with our expert colorists.', price: '1,500' },
    { icon: '💆‍♀️', name: 'Facial Treatments', description: 'Deep cleansing, anti-aging, brightening, and hydrating facials customized for your skin type.', price: '800' },
    { icon: '👰', name: 'Bridal Makeup', description: 'Complete bridal packages including makeup, hairstyling, and pre-wedding skincare sessions.', price: '5,000' },
    { icon: '💅', name: 'Manicure & Pedicure', description: 'Luxurious nail care with polish, gel, and nail art options. Pamper your hands and feet.', price: '400' },
    { icon: '🧖‍♀️', name: 'Spa & Body Massage', description: 'Relaxing full-body massages, body scrubs, and wraps for ultimate rejuvenation.', price: '1,200' },
    { icon: '✨', name: 'Skin Treatments', description: 'Advanced skin care including chemical peels, microdermabrasion, and pigmentation treatments.', price: '1,000' },
    { icon: '🌿', name: 'Hair Treatments', description: 'Keratin smoothing, deep conditioning, scalp treatments, and hair spa for healthy, shiny hair.', price: '1,500' },
    { icon: '👁️', name: 'Threading & Waxing', description: 'Eyebrow shaping, face threading, and full-body waxing with gentle, premium products.', price: '100' },
    { icon: '💄', name: 'Party Makeup', description: 'Glamorous makeup for parties, events, and special occasions. Look stunning wherever you go.', price: '2,000' },
    { icon: '🧴', name: 'Skin Consultation', description: 'Personalized skin analysis and product recommendations by our expert derma-cosmetologists.', price: '300' },
    { icon: '🌸', name: 'Aromatherapy', description: 'Calming aromatherapy sessions using essential oils for stress relief and mental wellness.', price: '900' },
];

/**
 * ServicesPage — full list of salon services.
 */
export default function ServicesPage() {
    const handleBook = (serviceName) => {
        window.dispatchEvent(new CustomEvent('open-booking', { detail: { service: serviceName } }));
    };

    return (
        <div className="services-page">
            <div className="page-header">
                <h1>Bespoke Services</h1>
                <p>An artful curation of beauty and wellness rituals tailored to your unique essence.</p>
            </div>

            <section className="section">
                <div className="container">
                    <div className="grid grid-3">
                        {services.map((service, idx) => (
                            <div key={idx} className="animate-fade-in-up" style={{ animationDelay: `${idx * 0.05}s` }}>
                                <ServiceCard service={service} index={idx} onBook={handleBook} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="services-note">
                <div className="container">
                    <div className="note-card">
                        <h3>📞 Instant Booking</h3>
                        <p>
                            Pick your ritual and stylist directly through our secure platform.
                            Your relaxation begins the moment you book.
                        </p>
                        <button className="btn btn-primary" onClick={() => handleBook('General Consultation')}>Book Appointment Now</button>
                    </div>
                </div>
            </section>
        </div>
    );
}
