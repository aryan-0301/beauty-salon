import { useState, useEffect } from 'react';
import { getAllProducts, createProduct, updateProduct, deleteProduct } from '../api/productApi';
import { getAllOrders } from '../api/orderApi';
import { getAllAppointments } from '../api/appointmentApi';
import './AdminDashboard.css';

// Demo data fallbacks
const demoProducts = [
    { id: 1, name: 'Rose Glow Face Serum', description: 'Hydrating serum', price: 899, stock: 25, imageUrl: '' },
    { id: 2, name: 'Keratin Hair Mask', description: 'Deep conditioning mask', price: 1299, stock: 15, imageUrl: '' },
    { id: 3, name: 'Vitamin C Cream', description: 'Brightening moisturizer', price: 749, stock: 30, imageUrl: '' },
];

const demoOrders = [
    { id: 1, customerName: 'Priya Sharma', phone: '+91 9876543210', address: 'Mumbai', totalAmount: 2198, paymentId: 'pay_demo1', orderStatus: 'CONFIRMED', createdAt: '2026-03-01' },
    { id: 2, customerName: 'Anita Patel', phone: '+91 9123456789', address: 'Pune', totalAmount: 1299, paymentId: 'pay_demo2', orderStatus: 'DELIVERED', createdAt: '2026-02-28' },
];

/**
 * AdminDashboard — product CRUD, stock management, and order viewing.
 * Protected by a simple password gate.
 */
export default function AdminDashboard() {
    const [authenticated, setAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState('products');

    // Products state
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [productForm, setProductForm] = useState({
        name: '', description: '', price: '', stock: '', imageUrl: '', category: 'Hair'
    });

    // Orders state
    const [orders, setOrders] = useState([]);
    // Appointments state
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        if (authenticated) {
            fetchProducts();
            fetchOrders();
            fetchAppointments();
        }
    }, [authenticated]);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await getAllProducts();
            setProducts(res.data);
        } catch (err) {
            console.error('Error fetching products:', err);
            setProducts([]);
        }
        setLoading(false);
    };

    const fetchOrders = async () => {
        try {
            const res = await getAllOrders();
            setOrders(res.data);
        } catch (err) {
            console.error('Error fetching orders:', err);
            setOrders([]);
        }
    };

    const fetchAppointments = async () => {
        try {
            const res = await getAllAppointments();
            setAppointments(res.data);
        } catch (err) {
            console.error('Error fetching appointments:', err);
            setAppointments([]);
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === 'admin123') {
            setAuthenticated(true);
        } else {
            showToast('Invalid password', 'error');
        }
    };

    const handleProductFormChange = (e) => {
        setProductForm({ ...productForm, [e.target.name]: e.target.value });
    };

    const resetProductForm = () => {
        setProductForm({ name: '', description: '', price: '', stock: '', imageUrl: '', category: 'Hair' });
        setEditingProduct(null);
    };

    const handleSaveProduct = async (e) => {
        e.preventDefault();
        const payload = {
            ...productForm,
            price: parseFloat(productForm.price),
            stock: parseInt(productForm.stock),
        };

        try {
            if (editingProduct) {
                await updateProduct(editingProduct.id, payload);
                showToast('Product updated successfully');
            } else {
                await createProduct(payload);
                showToast('Product added successfully');
            }
            fetchProducts();
        } catch {
            // Simulate locally
            if (editingProduct) {
                setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...p, ...payload } : p));
                showToast('Product updated (locally)');
            } else {
                setProducts(prev => [...prev, { ...payload, id: Date.now() }]);
                showToast('Product added (locally)');
            }
        }
        resetProductForm();
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setProductForm({
            name: product.name,
            description: product.description,
            price: product.price.toString(),
            stock: product.stock.toString(),
            imageUrl: product.imageUrl || '',
            category: product.category || 'Hair',
        });
        setActiveTab('products');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDeleteProduct = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;

        console.log('Attempting to delete product with ID:', id);
        setLoading(true);

        try {
            await deleteProduct(id);
            showToast('Product deleted successfully');
            // Optimistically update UI
            setProducts(prev => prev.filter(p => p.id !== id));
            // Then sync with server
            fetchProducts();
        } catch (err) {
            console.error('Failed to delete product from server:', err);
            // Even if server fails, we'll try to filter locally if it's a demo item
            setProducts(prev => prev.filter(p => p.id !== id));
            showToast('Product removed from view', 'warning');
        } finally {
            setLoading(false);
        }
    };

    // Password gate
    if (!authenticated) {
        return (
            <div className="admin-page">
                <div className="page-header">
                    <h1>Admin Dashboard</h1>
                    <p>Enter admin password to continue</p>
                </div>
                <div className="section">
                    <div className="container">
                        <form className="admin-login" onSubmit={handleLogin}>
                            <div className="form-group">
                                <label className="form-label">Password</label>
                                <input
                                    className="form-input"
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="Enter admin password"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                                Login
                            </button>
                            <p className="admin-hint">Default password: <code>admin123</code></p>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-page">
            <div className="page-header">
                <h1>Admin Dashboard</h1>
                <p>Manage products, stock, and orders</p>
            </div>

            {toast && <div className={`toast toast-${toast.type}`}>{toast.message}</div>}

            <section className="section">
                <div className="container">
                    {/* Tabs */}
                    <div className="admin-tabs">
                        <button
                            className={`admin-tab ${activeTab === 'products' ? 'active' : ''}`}
                            onClick={() => setActiveTab('products')}
                        >
                            📦 Products ({products.length})
                        </button>
                        <button
                            className={`admin-tab ${activeTab === 'orders' ? 'active' : ''}`}
                            onClick={() => setActiveTab('orders')}
                        >
                            📋 Orders ({orders.length})
                        </button>
                        <button
                            className={`admin-tab ${activeTab === 'appointments' ? 'active' : ''}`}
                            onClick={() => setActiveTab('appointments')}
                        >
                            📅 Appointments ({appointments.length})
                        </button>
                        <button className="btn btn-sm btn-secondary" onClick={() => setAuthenticated(false)}>
                            Logout
                        </button>
                    </div>

                    {/* PRODUCTS TAB */}
                    {activeTab === 'products' && (
                        <div className="admin-content">
                            {/* Product Form */}
                            <div className="admin-form-card">
                                <h3>{editingProduct ? '✏️ Edit Product' : '➕ Add New Product'}</h3>
                                <form onSubmit={handleSaveProduct}>
                                    <div className="admin-form-grid">
                                        <div className="form-group">
                                            <label className="form-label">Product Name *</label>
                                            <input className="form-input" name="name" value={productForm.name} onChange={handleProductFormChange} required />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Category *</label>
                                            <select className="form-input" name="category" value={productForm.category} onChange={handleProductFormChange} required>
                                                <option value="Hair">Hair</option>
                                                <option value="Skincare">Skincare</option>
                                                <option value="Hair Care">Hair Care</option>
                                                <option value="Makeup">Makeup</option>
                                                <option value="Nail Care">Nail Care</option>
                                                <option value="Body Care">Body Care</option>
                                                <option value="Salon Professional">Salon Professional</option>
                                                <option value="Herbal Products">Herbal Products</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Image URL</label>
                                            <input className="form-input" name="imageUrl" value={productForm.imageUrl} onChange={handleProductFormChange} placeholder="https://..." />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Price (₹) *</label>
                                            <input className="form-input" name="price" type="number" min="0" value={productForm.price} onChange={handleProductFormChange} required />
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Stock *</label>
                                            <input className="form-input" name="stock" type="number" min="0" value={productForm.stock} onChange={handleProductFormChange} required />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Description</label>
                                        <textarea className="form-input form-textarea" name="description" value={productForm.description} onChange={handleProductFormChange} rows="3" />
                                    </div>
                                    <div className="admin-form-actions">
                                        <button type="submit" className="btn btn-primary">
                                            {editingProduct ? 'Update Product' : 'Add Product'}
                                        </button>
                                        {editingProduct && (
                                            <button type="button" className="btn btn-secondary" onClick={resetProductForm}>
                                                Cancel
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>

                            {/* Products Table */}
                            <div className="admin-table-wrapper">
                                <h3>All Products</h3>
                                {loading ? <div className="spinner"></div> : (
                                    <div className="admin-table-scroll">
                                        <table className="admin-table">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Name</th>
                                                    <th>Price</th>
                                                    <th>Stock</th>
                                                    <th>Category</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {products.map(product => (
                                                    <tr key={product.id}>
                                                        <td>#{product.id}</td>
                                                        <td>
                                                            <div className="table-product">
                                                                <strong>{product.name}</strong>
                                                                <small>{product.description?.substring(0, 50)}{product.description?.length > 50 ? '...' : ''}</small>
                                                            </div>
                                                        </td>
                                                        <td>₹{product.price?.toLocaleString('en-IN')}</td>
                                                        <td>
                                                            <span className={`badge ${product.stock > 0 ? (product.stock <= 5 ? 'badge-warning' : 'badge-success') : 'badge-error'}`}>
                                                                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                                                            </span>
                                                        </td>
                                                        <td><span className="badge badge-secondary">{product.category}</span></td>
                                                        <td>
                                                            <div className="table-actions">
                                                                <button className="btn btn-sm btn-secondary" onClick={() => handleEditProduct(product)}>Edit</button>
                                                                <button className="btn btn-sm btn-danger" onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* ORDERS TAB */}
                    {activeTab === 'orders' && (
                        <div className="admin-content">
                            <div className="admin-table-wrapper">
                                <h3>All Orders</h3>
                                <div className="admin-table-scroll">
                                    <table className="admin-table">
                                        <thead>
                                            <tr>
                                                <th>Order ID</th>
                                                <th>Customer</th>
                                                <th>Phone</th>
                                                <th>Amount</th>
                                                <th>Payment ID</th>
                                                <th>Status</th>
                                                <th>Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map(order => (
                                                <tr key={order.id}>
                                                    <td>#{order.id}</td>
                                                    <td><strong>{order.customerName}</strong></td>
                                                    <td>{order.phone}</td>
                                                    <td>₹{order.totalAmount?.toLocaleString('en-IN')}</td>
                                                    <td><code>{order.paymentId}</code></td>
                                                    <td>
                                                        <span className={`badge ${order.orderStatus === 'DELIVERED' ? 'badge-success' : order.orderStatus === 'CONFIRMED' ? 'badge-warning' : 'badge-error'}`}>
                                                            {order.orderStatus}
                                                        </span>
                                                    </td>
                                                    <td>{order.createdAt?.substring(0, 10)}</td>
                                                </tr>
                                            ))}
                                            {orders.length === 0 && (
                                                <tr>
                                                    <td colSpan="7" style={{ textAlign: 'center', padding: '2rem' }}>No orders found.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* APPOINTMENTS TAB */}
                    {activeTab === 'appointments' && (
                        <div className="admin-content">
                            <div className="admin-table-wrapper">
                                <h3>Manage Appointments</h3>
                                <div className="admin-table-scroll">
                                    <table className="admin-table">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Customer</th>
                                                <th>Phone</th>
                                                <th>Service</th>
                                                <th>Purpose</th>
                                                <th>Date</th>
                                                <th>Time</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {appointments.map(appt => (
                                                <tr key={appt.id}>
                                                    <td>#{appt.id}</td>
                                                    <td><strong>{appt.customerName}</strong></td>
                                                    <td>{appt.phone}</td>
                                                    <td>{appt.serviceName}</td>
                                                    <td><small>{appt.purpose || '-'}</small></td>
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
                                                    <td colSpan="8" style={{ textAlign: 'center', padding: '2rem' }}>No appointments booked yet.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
