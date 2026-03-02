import API from './api';

export const bookAppointment = (appointmentData) => API.post('/appointments/book', appointmentData);
export const getAllAppointments = () => API.get('/appointments');
