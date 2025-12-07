import axios from 'axios';

const api = axios.create({
    baseURL: '/api', // Vite proxy handles this
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
