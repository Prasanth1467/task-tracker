import axios from "axios";

const apiURL = process.env.REACT_APP_API_URL || "http://localhost:5000/api"; // Default for development

const api = axios.create({
  baseURL: apiURL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
