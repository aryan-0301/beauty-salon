import API from './api';

/** Create a Razorpay order on the backend */
export const createPaymentOrder = (amount) =>
    API.post('/payment/create', { amount });

/** Verify Razorpay payment on the backend */
export const verifyPayment = (paymentData) =>
    API.post('/payment/verify', paymentData);
