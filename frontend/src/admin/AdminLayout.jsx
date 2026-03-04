import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import authService from '../api/authService';
import './AdminLayout.css';

const AdminLayout = () => {
    const navigate = useNavigate();
    const user = authService.getCurrentUser();

    const handleLogout = () => {
        authService.logout();
        navigate('/admin/login');
    };

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="sidebar-header">
                    <h2>Darshana Admin</h2>
                    <p>Welcome, {user?.name || 'Admin'}</p>
                </div>
                <nav className="sidebar-nav">
                    <Link to="/admin/dashboard" className="nav-item">📊 Dashboard</Link>
                    <Link to="/admin/bookings" className="nav-item">📅 Bookings</Link>
                    <Link to="/admin/users" className="nav-item">👥 Users</Link>
                    <Link to="/products" className="nav-item">🛍️ View Shop</Link>
                </nav>
                <div className="sidebar-footer">
                    <button onClick={handleLogout} className="btn-logout">Logout</button>
                </div>
            </aside>
            <main className="admin-main">
                <header className="admin-header">
                    <h1>Admin Control Panel</h1>
                </header>
                <div className="admin-content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
