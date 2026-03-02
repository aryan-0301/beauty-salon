import API from './api';

/** Create a new order */
export const createOrder = (orderData) => API.post('/orders', orderData);

/** Fetch all orders (admin) */
export const getAllOrders = () => API.get('/orders');

/** Update order status (admin) */
export const updateOrderStatus = (id, status) =>
    API.put(`/orders/${id}/status`, { status });
