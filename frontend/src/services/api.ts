import axios from 'axios';
import { AuthResponse, Company, Application } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: async (email: string, password: string, role?: string, adminCode?: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', { email, password, role, adminCode });
    return response.data;
  },
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
};

// Company API
export const companyAPI = {
  getAll: async (): Promise<Company[]> => {
    const response = await api.get('/companies');
    return response.data;
  },
  getById: async (id: string): Promise<Company> => {
    const response = await api.get(`/companies/${id}`);
    return response.data;
  },
  create: async (company: Partial<Company>): Promise<Company> => {
    const response = await api.post('/companies', company);
    return response.data;
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/companies/${id}`);
  },
  toggleStatus: async (id: string): Promise<Company> => {
    const response = await api.patch(`/companies/${id}/toggle`);
    return response.data;
  },
};

// Application API
export const applicationAPI = {
  apply: async (companyId: string): Promise<Application> => {
    const response = await api.post('/applications/apply', { companyId });
    return response.data;
  },
  getMyApplications: async (): Promise<Application[]> => {
    const response = await api.get('/applications/my');
    return response.data;
  },
  updateStatus: async (id: string, status: 'PENDING' | 'APPLIED' | 'REJECTED'): Promise<Application> => {
    const response = await api.patch(`/applications/${id}/status`, { status });
    return response.data;
  },
  getAll: async (): Promise<Application[]> => {
    const response = await api.get('/applications/admin/all');
    return response.data;
  },
};

export default api;
