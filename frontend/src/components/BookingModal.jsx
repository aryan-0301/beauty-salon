import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, User, CheckCircle2, MessageSquare } from 'lucide-react';
import { bookAppointment } from '../api/appointmentApi';
import './BookingModal.css';

/**
 * BookingModal — a premium scheduling interface with calendar and time selection.
 */
export default function BookingModal({ isOpen, onClose, serviceName }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        customerName: '',
        email: '',
        phone: '',
        serviceName: serviceName || 'General Consultation',
        purpose: '',
        appointmentDate: '',
        appointmentTime: ''
    });
    const [loading, setLoading] = useState(false);
    const [booked, setBooked] = useState(false);
    const [error, setError] = useState(null);

    const timeSlots = [
        "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM",
        "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM"
    ];

    // Simple date generator for the next 7 days
    const getNext7Days = () => {
        const days = [];
        for (let i = 1; i <= 7; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i);
            days.push({
                full: date.toISOString().split('T')[0],
                day: date.toLocaleDateString('en-US', { weekday: 'short' }),
                date: date.getDate(),
                month: date.toLocaleDateString('en-US', { month: 'short' })
            });
        }
        return days;
    };

    const nextDays = getNext7Days();

    const handleBooking = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await bookAppointment(formData);
            setBooked(true);
            setStep(3);
        } catch (err) {
            console.error("Booking failed:", err);
            setError("Something went wrong with the digital booking. Please try again or contact us directly.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="booking-overlay" onClick={onClose}>
                <motion.div
                    className="booking-content"
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    onClick={e => e.stopPropagation()}
                >
                    <button className="booking-close" onClick={onClose}><X /></button>

                    <div className="booking-header">
                        {step <= 2 && <span className="booking-step-indicator">Step {step} of 2</span>}
                        <h2>{step === 3 ? 'Ritual Secured' : 'Secure Your Ritual'}</h2>
                        <p>{formData.serviceName}</p>
                    </div>

                    {step === 1 && (
                        <div className="booking-step">
                            <h3>Select Date & Time</h3>
                            <div className="calendar-grid">
                                {nextDays.map((d) => (
                                    <button
                                        key={d.full}
                                        className={`calendar-day ${formData.appointmentDate === d.full ? 'active' : ''}`}
                                        onClick={() => setFormData({ ...formData, appointmentDate: d.full })}
                                    >
                                        <span className="day-name">{d.day}</span>
                                        <span className="day-num">{d.date}</span>
                                        <span className="day-month">{d.month}</span>
                                    </button>
                                ))}
                            </div>

                            <h3>Available Slots</h3>
                            <div className="time-grid">
                                {timeSlots.map((slot) => (
                                    <button
                                        key={slot}
                                        className={`time-slot ${formData.appointmentTime === slot ? 'active' : ''}`}
                                        onClick={() => setFormData({ ...formData, appointmentTime: slot })}
                                    >
                                        {slot}
                                    </button>
                                ))}
                            </div>

                            <button
                                className="btn btn-primary booking-next"
                                disabled={!formData.appointmentDate || !formData.appointmentTime}
                                onClick={() => setStep(2)}
                            >
                                Continue to Details
                            </button>
                        </div>
                    )}

                    {step === 2 && !booked && (
                        <form className="booking-step" onSubmit={handleBooking}>
                            {error && <div className="booking-error-message">{error}</div>}

                            <div className="form-group">
                                <label><User size={16} /> Full Name</label>
                                <input
                                    type="text"
                                    required
                                    className="form-input"
                                    value={formData.customerName}
                                    onChange={e => setFormData({ ...formData, customerName: e.target.value })}
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input
                                    type="tel"
                                    required
                                    className="form-input"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="+91..."
                                />
                            </div>
                            <div className="form-group">
                                <label>Purpose of Appointment</label>
                                <textarea
                                    className="form-input"
                                    value={formData.purpose}
                                    onChange={e => setFormData({ ...formData, purpose: e.target.value })}
                                    placeholder="Briefly describe what the appointment is for..."
                                    rows="3"
                                />
                            </div>
                            <div className="form-group">
                                <label>Email Address (Optional)</label>
                                <input
                                    type="email"
                                    className="form-input"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div className="booking-actions">
                                <button type="button" className="btn btn-secondary" onClick={() => setStep(1)}>Back</button>
                                <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? 'Processing...' : 'Confirm Appointment'}
                                </button>
                            </div>
                        </form>
                    )}

                    {step === 3 && (
                        <motion.div
                            className="booking-success"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <div className="success-icon"><CheckCircle2 size={64} /></div>
                            <h3>Confirmed!</h3>
                            <p>Your appointment has been successfully scheduled. We look forward to seeing you at your ritual.</p>
                            <div className="success-details">
                                <span><Calendar size={14} /> {formData.appointmentDate}</span>
                                <span><Clock size={14} /> {formData.appointmentTime}</span>
                            </div>
                            <button
                                className="btn btn-primary"
                                onClick={onClose}
                                style={{ marginTop: '2rem', width: '100%' }}
                            >
                                Done
                            </button>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
