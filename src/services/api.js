import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  changePassword: (data) => api.post('/auth/change-password', data)
};

// Project APIs
export const projectAPI = {
  getAll: (params) => api.get('/projects', { params }),
  getOne: (id) => api.get(`/projects/${id}`),
  create: (data) => api.post('/projects', data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`)
};

// Skill APIs
export const skillAPI = {
  getAll: (params) => api.get('/skills', { params }),
  create: (data) => api.post('/skills', data),
  update: (id, data) => api.put(`/skills/${id}`, data),
  delete: (id) => api.delete(`/skills/${id}`)
};

// Education APIs
export const educationAPI = {
  getAll: () => api.get('/education'),
  create: (data) => api.post('/education', data),
  update: (id, data) => api.put(`/education/${id}`, data),
  delete: (id) => api.delete(`/education/${id}`)
};

// Contact APIs
export const contactAPI = {
  submit: (data) => api.post('/contact', data),
  getAll: (params) => api.get('/contact', { params }),
  markAsRead: (id) => api.patch(`/contact/${id}/read`),
  delete: (id) => api.delete(`/contact/${id}`)
};

// Profile APIs
export const profileAPI = {
  get: () => api.get('/profile'),
  update: (data) => api.put('/profile', data)
};

// Upload APIs
export const uploadAPI = {
  single: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/upload/single', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  multiple: (files) => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
    return api.post('/upload/multiple', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  delete: (filename) => api.delete(`/upload/${filename}`)
};

export default api;
