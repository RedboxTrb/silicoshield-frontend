// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const API_ENDPOINTS = {
  predict: `${API_BASE_URL}/api/predict`,
  health: `${API_BASE_URL}/api/health`,
  auth: {
    login: `${API_BASE_URL}/api/auth/login`,
    verify: `${API_BASE_URL}/api/auth/verify`,
  },
};

// Helper to get headers
// Set includeContentType to false when uploading files/FormData
export const getAPIHeaders = (includeContentType = true) => {
  const headers: Record<string, string> = {};

  if (includeContentType) {
    headers['Content-Type'] = 'application/json';
  }

  return headers;
};
