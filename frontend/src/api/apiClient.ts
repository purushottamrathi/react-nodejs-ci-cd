import axios from "axios";

/**
 * Central API client
 * Easy to extend later with auth, interceptors, logging
 */
export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL as string,
    timeout: 10000
});