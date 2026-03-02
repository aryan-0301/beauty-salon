import axios from 'axios';

// Base API instance — points to Spring Boot backend
const API = axios.create({
    baseURL: 'https://beauty-salon-1-g6w4.onrender.com/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default API;
