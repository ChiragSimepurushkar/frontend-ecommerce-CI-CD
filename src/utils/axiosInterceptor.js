import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

// Create axios instance
const axiosInstance = axios.create({
    baseURL: apiUrl,
});

// Response interceptor to handle token expiration globally
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const { status, data } = error.response;

            // Handle 401 (Unauthorized) errors
            if (status === 401) {
                const errorMessage = data?.message?.toLowerCase() || '';
                
                // Check for authentication-related error messages
                if (
                    errorMessage.includes("you have not login") ||
                    errorMessage.includes("provide token") ||
                    errorMessage.includes("unauthorized access") ||
                    errorMessage.includes("jwt expired") ||
                    errorMessage.includes("invalid token") ||
                    errorMessage.includes("token expired") ||
                    data?.message === "You have not login" ||
                    data?.message === "Provide token" ||
                    data?.message === "unauthorized access"
                ) {
                    // Clear tokens
                    localStorage.removeItem("accesstoken");
                    localStorage.removeItem("refreshToken");
                    
                    // Show alert if toast is available
                    if (window.showToast) {
                        window.showToast("error", "Your session has expired. Please login again.");
                    }
                    
                    // Redirect to login (only if not already on login/auth pages)
                    // const currentPath = window.location.pathname;
                    // if (
                    //     !currentPath.includes('/login') && 
                    //     !currentPath.includes('/sign-up') &&
                    //     !currentPath.includes('/forgot-password') &&
                    //     !currentPath.includes('/verify-account') &&
                    //     !currentPath.includes('/change-password')
                    // ) {
                    //     setTimeout(() => {
                    //         window.location.href = "/login";
                    //     }, 1000); // Small delay to show toast message
                    // }
                }
            }
            
            // Handle specific 500 errors related to authentication only
            if (status === 500 && data?.message) {
                const errorMessage = data.message.toLowerCase();
                if (
                    errorMessage.includes("jwt") ||
                    errorMessage.includes("token") ||
                    errorMessage.includes("unauthorized")
                ) {
                    localStorage.removeItem("accesstoken");
                    localStorage.removeItem("refreshToken");
                    
                    if (window.showToast) {
                        window.showToast("error", "Authentication error. Please login again.");
                    }
                    
                    const currentPath = window.location.pathname;
                    if (!currentPath.includes('/login')) {
                        setTimeout(() => {
                            window.location.href = "/login";
                        }, 1000);
                    }
                }
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;