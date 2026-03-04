import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import authService from '../api/authService';

const ProtectedRoute = ({ children, role }) => {
    const user = authService.getCurrentUser();
    const location = useLocation();

    if (!user) {
        // Redirect to login but save the current location they were trying to go to
        const loginPath = role === 'ADMIN' ? '/admin/login' : '/login';
        return <Navigate to={loginPath} state={{ from: location }} replace />;
    }

    if (role && user.role !== role) {
        // If user is logged in but doesn't have the required role
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
