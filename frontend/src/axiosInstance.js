import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/";

const axiosInstance = axios.create({
     baseURL,
     headers: { "Content-Type": "application/json" },
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
                try {
                const { data } = await axios.post(`${baseURL}token/refresh/`, { refresh });
                localStorage.setItem("access_token", data.access);
                // Retry the original request
                originalRequest.headers.Authorization = `Bearer ${data.access}`;
                return axiosInstance(originalRequest);
                } catch (err) {
                console.error("Refresh token expired. Please log in again.");
                localStorage.clear();
                window.location.href = "/login"; // redirect if needed
                }
            }
            }

            return Promise.reject(error);
        }
        );

        export default axiosInstance;