import axios from "axios";
import { API_BASE_URL, API_KEY, getAuthToken } from "./config";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (API_KEY) {
    config.headers["X-Noroff-API-Key"] = API_KEY;
  }
  return config;
});

export default api;
