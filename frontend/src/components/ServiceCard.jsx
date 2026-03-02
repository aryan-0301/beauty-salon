import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import './ServiceCard.css';

/**
 * ServiceCard — premium display for a salon service with animations.
 */
export default function ServiceCard({ service, index, onBook }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="service-card"
            onClick={() => onBook && onBook(service.name)}
        >
            <div className="service-card-image-wrapper">
                {/* Fallback pattern if no image is provided, though usually it's an icon in the current data */}
                <div className="service-card-visual">
                    <span className="service-icon-large">{service.icon}</span>
                </div>
                <div className="service-card-overlay"></div>
            </div>

            <div className="service-card-content">
                <span className="service-number">0{index + 1}</span>
                <h3 className="service-title">{service.name}</h3>
                <p className="service-description">{service.description}</p>

                <div className="service-card-footer">
                    {service.price && (
                        <div className="service-price">
                            <span className="currency">₹</span>
                            <span className="amount">{service.price}</span>
                        </div>
                    )}
                    <button
                        className="service-learn-more"
                        aria-label={`Book ${service.name}`}
                        onClick={(e) => { e.stopPropagation(); onBook && onBook(service.name); }}
                    >
                        <ArrowRight size={18} strokeWidth={1.5} />
                    </button>
                </div>
            </div>

            <motion.div
                className="service-card-border"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
            />
        </motion.div>
    );
}
