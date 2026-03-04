import React, { useState, useEffect } from 'react';
import { getAllProducts, createProduct, updateProduct, deleteProduct } from '../api/productApi';
import { getAllOrders } from '../api/orderApi';
import '../pages/AdminDashboard.css';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [productForm, setProductForm] = useState({
        name: '', description: '', price: '', stock: '', imageUrl: '', category: 'Hair'
    });
    const [toast, setToast] = useState(null);

    useEffect(() => {
        fetchProducts();
        fetchOrders();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await getAllProducts();
            setProducts(res.data);
        } catch (err) {
            console.error('Error fetching products:', err);
        }
        setLoading(false);
    };

    const fetchOrders = async () => {
        try {
            const res = await getAllOrders();
            setOrders(res.data);
        } catch (err) {
            console.error('Error fetching orders:', err);
        }
    };

    const handleProductFormChange = (e) => {
        setProductForm({ ...productForm, [e.target.name]: e.target.value });
    };

    const resetProductForm = () => {
        setProductForm({ name: '', description: '', price: '', stock: '', imageUrl: '', category: 'Hair' });
        setEditingProduct(null);
    };

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
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
        } catch (err) {
            showToast('Failed to save product', 'error');
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDeleteProduct = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        try {
            await deleteProduct(id);
            showToast('Product deleted successfully');
            fetchProducts();
        } catch (err) {
            showToast('Failed to delete product', 'error');
        }
    };

    return (
        <div className="admin-page-content">
            {toast && <div className={`toast toast-${toast.type}`}>{toast.message}</div>}

            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Total Products</h3>
                    <p className="stat-value">{products.length}</p>
                </div>
                <div className="stat-card">
                    <h3>Total Orders</h3>
                    <p className="stat-value">{orders.length}</p>
                </div>
                <div className="stat-card">
                    <h3>Revenue</h3>
                    <p className="stat-value">₹{orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0).toLocaleString('en-IN')}</p>
                </div>
            </div>

            <div className="admin-form-card" style={{ marginTop: '2rem' }}>
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
                                <option value="Makeup">Makeup</option>
                                <option value="Nail Care">Nail Care</option>
                            </select>
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

            <div className="admin-table-wrapper" style={{ marginTop: '2rem' }}>
                <h3>Product Inventory</h3>
                <div className="admin-table-scroll">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.id}>
                                    <td>#{product.id}</td>
                                    <td><strong>{product.name}</strong></td>
                                    <td>₹{product.price?.toLocaleString('en-IN')}</td>
                                    <td>
                                        <span className={`badge ${product.stock > 0 ? 'badge-success' : 'badge-error'}`}>
                                            {product.stock} in stock
                                        </span>
                                    </td>
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
            </div>
        </div>
    );
};

export default AdminDashboard;
