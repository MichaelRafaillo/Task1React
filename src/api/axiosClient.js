import axios from "axios";

// Create an axios instance with base configuration
// This is our API client that will handle all HTTP requests
const axiosClient = axios.create({
  baseURL: "https://dummyjson.com", // Base URL for all API calls
  headers: {
    "Content-Type": "application/json", // Set default content type
  },
});

// Request interceptor - runs before every request
// Useful for adding authentication tokens, logging, etc.
axiosClient.interceptors.request.use(
  (config) => {
    // You can modify the request config here if needed
    // For example, add authentication tokens
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Response interceptor - runs after every response
// Useful for handling errors globally
axiosClient.interceptors.response.use(
  (response) => {
    // If the request is successful, return the data
    return response;
  },
  (error) => {
    // Handle response errors globally
    // You can show error messages, redirect, etc.
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default axiosClient;
