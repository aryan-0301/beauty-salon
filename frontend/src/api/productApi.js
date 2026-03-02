import API from './api';

/** Fetch all products */
export const getAllProducts = () => API.get('/products');

/** Fetch a single product by ID */
export const getProductById = (id) => API.get(`/products/${id}`);

/** Create a new product (admin) */
export const createProduct = (product) => API.post('/products', product);

/** Update a product (admin) */
export const updateProduct = (id, product) => API.put(`/products/${id}`, product);

/** Delete a product (admin) */
export const deleteProduct = (id) => API.delete(`/products/${id}`);
