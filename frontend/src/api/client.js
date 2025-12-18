import axios from 'axios';

// Use environment variable or default to relative path for production
const baseURL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const analyzeDay = async (data) => {
    return await api.post('/analyze', data);
};

export const getHistory = async () => {
    return await api.get('/history');
};

export const getSample = async () => {
    return await api.get('/sample');
}
