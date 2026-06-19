import axios from 'axios';

const API = axios.create({
    baseURL: 'https://analytics-tracker-backend.onrender.com/api'
});

export const getSessions = () => API.get('/sessions');
export const getSessionEvents = (sessionId) => API.get(`/sessions/${sessionId}/events`);
export const getHeatmapData = (pageUrl) => API.get(`/heatmap?pageUrl=${encodeURIComponent(pageUrl)}`);
export const getAllPages = () => API.get('/pages');