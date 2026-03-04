import React, { useState, useEffect } from 'react';
import API from '../api/api';
import '../pages/AdminDashboard.css';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await API.get('/admin/users');
            setUsers(res.data);
        } catch (err) {
            console.error('Error fetching users:', err);
        }
        setLoading(false);
    };

    return (
        <div className="admin-page-content">
            <div className="admin-table-wrapper">
                <div className="table-header">
                    <h3>Registered Users</h3>
                    <button className="btn btn-outline btn-sm" onClick={fetchUsers}>Refresh</button>
                </div>

                {loading ? <div className="spinner"></div> : (
                    <div className="admin-table-scroll">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user.id}>
                                        <td>#{user.id}</td>
                                        <td><strong>{user.name}</strong></td>
                                        <td>{user.email}</td>
                                        <td>
                                            <span className={`badge ${user.role === 'ADMIN' ? 'badge-primary' : 'badge-secondary'}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {users.length === 0 && (
                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>No users found.</td>
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

export default AdminUsers;
