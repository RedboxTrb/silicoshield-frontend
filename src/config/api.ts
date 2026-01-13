// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || '';
export const API_KEY = import.meta.env.VITE_API_KEY || 'demo-key-change-this-in-production';

export const API_ENDPOINTS = {
  predict: `${API_BASE_URL}/api/predict`,
  health: `${API_BASE_URL}/api/health`,
};

// Helper to get headers with API key
export const getAPIHeaders = () => ({
  'X-API-Key': API_KEY,
});
