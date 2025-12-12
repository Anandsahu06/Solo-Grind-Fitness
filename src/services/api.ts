import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle token expiration
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Only remove the token, let AuthContext handle the redirect
            localStorage.removeItem('authToken');
            localStorage.removeItem('userData');
        }
        return Promise.reject(error);
    }
);

export const authAPI = {
    register: (data: any) => api.post('/auth/register', data),
    login: (data: any) => api.post('/auth/login', data),
    forgotPassword: (email: string) => api.post('/auth/forgot-password', { email }),
    resetPassword: (token: string, password: string) => api.post('/auth/reset-password', { token, password }),
    verifyEmail: (token: string) => api.post('/auth/verify-email', { token }),
    getMe: () => api.get('/auth/me'),
};

export const userAPI = {
    getProfile: () => api.get('/users/me'),
    updateProfile: (data: any) => api.patch('/users/me', data),
    deleteAccount: () => api.delete('/users/me'),
};

export default api;
