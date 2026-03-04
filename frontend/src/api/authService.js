import API from './api';

const signup = (name, email, password) => {
    return API.post('/auth/signup', {
        name,
        email,
        password,
    });
};

const login = (email, password) => {
    return API.post('/auth/login', {
        email,
        password,
    })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem('user');
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const authService = {
    signup,
    login,
    logout,
    getCurrentUser,
};

export default authService;
