import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

// Configure the shared Axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
});

// Add JWT token to requests made through `api`
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Also add JWT to existing direct axios calls in the project.
// This allows old components using `axios.get(...)` / `axios.post(...)`
// to work with JWT without changing every component immediately.
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Automatically logout when backend rejects an expired/invalid token.
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("role");
            localStorage.removeItem("name");
            localStorage.removeItem("id");
            localStorage.removeItem("profilePicture");
        }

        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("role");
            localStorage.removeItem("name");
            localStorage.removeItem("id");
            localStorage.removeItem("profilePicture");
        }

        return Promise.reject(error);
    }
);

export default api;
