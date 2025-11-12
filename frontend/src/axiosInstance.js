import axios from "axios";
import { toast } from 'react-toastify';

const baseURL = "http://127.0.0.1:8000/api/";

const axiosInstance = axios.create({
     baseURL,
     headers: { 
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("access_token")
      ? `Bearer ${localStorage.getItem("access_token")}`
      : "",
     },
});

// Request interceptor to attach access token
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
    );

    // Response interceptor for handling expired tokens
    axiosInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            // If token is expired
            if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refresh = localStorage.getItem("refresh_token");
            if (refresh) {
                toast.warning("Session expired. Please login again.");
                window.location.href = "/";
                return Promise.reject(error);
            }
                try {
            const response = await axios.post(`${baseURL}token/refresh/`, {
            refresh: refreshToken,
                });
                        
            const newAccessToken = response.data.access;
            localStorage.setItem("access_token", newAccessToken);

            // Update header and retry the original request
            axiosInstance.defaults.headers["Authorization"] = `Bearer ${newAccessToken}`;
            originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

            return axiosInstance(originalRequest);
            
            }catch (refresh) {
                toast.warning("Session expired. Please login again.")
                localStorage.clear();
                window.location.href = "/";
            }
        }

            return Promise.reject(error);
        }
        );

        export default axiosInstance;