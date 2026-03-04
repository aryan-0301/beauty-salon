import React, { useState, useEffect } from 'react';
import { getAllAppointments } from '../api/appointmentApi';
import '../pages/AdminDashboard.css';

const AdminBookings = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        setLoading(true);
        try {
            const res = await getAllAppointments();
            setAppointments(res.data);
        } catch (err) {
            console.error('Error fetching appointments:', err);
        }
        setLoading(false);
    };

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    return (
        <div className="admin-page-content">
            {toast && <div className={`toast toast-${toast.type}`}>{toast.message}</div>}

            <div className="admin-table-wrapper">
                <div className="table-header">
                    <h3>Manage Appointments</h3>
                    <button className="btn btn-outline btn-sm" onClick={fetchAppointments}>Refresh</button>
                </div>

                {loading ? <div className="spinner"></div> : (
                    <div className="admin-table-scroll">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Customer</th>
                                    <th>Service</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map(appt => (
                                    <tr key={appt.id}>
                                        <td>#{appt.id}</td>
                                        <td>
                                            <strong>{appt.customerName}</strong><br />
                                            <small>{appt.phone}</small>
                                        </td>
                                        <td>{appt.serviceName}</td>
                                        <td>{appt.appointmentDate}</td>
                                        <td>{appt.appointmentTime}</td>
                                        <td>
                                            <span className={`badge badge-${appt.status === 'CONFIRMED' ? 'success' : 'warning'}`}>
                                                {appt.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {appointments.length === 0 && (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>No appointments found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminBookings;
