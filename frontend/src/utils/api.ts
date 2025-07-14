const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";

export const getApiBaseUrl = () => {
  return API_BASE_URL;
};

export const getApiUrl = (endpoint: string) => {
  return `${API_BASE_URL}${endpoint}`;
};

export default API_BASE_URL;
