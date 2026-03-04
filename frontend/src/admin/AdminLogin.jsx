import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../api/authService';
import '../pages/LoginPage.css';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const user = await authService.login(email, password);
            if (user.role === 'ADMIN') {
                navigate('/admin/dashboard');
            } else {
                setError('Access denied. You do not have admin privileges.');
                authService.logout();
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container admin-login-bg">
            <div className="auth-card">
                <div className="auth-header">
                    <span className="badge badge-primary">Admin Only</span>
                    <h1>Staff Login</h1>
                    <p>Enter administrative credentials</p>
                </div>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleLogin} className="auth-form">
                    <div className="form-group">
                        <label className="form-label">Admin Email</label>
                        <input
                            type="email"
                            className="form-input"
                            placeholder="admin@darshu.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-input"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
                        {loading ? 'Authenticating...' : 'Login to Dashboard'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
