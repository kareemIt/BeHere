import { apiClient } from "./apiClient";

export const login = (username, password) => {
    return apiClient("login", "POST", { username, password });
};

export const register = (userData) => {
    return apiClient("register", "POST", userData);
};

export const getSecureData = () => {
    return apiClient("secured-endpoint", "GET", null, true);
};
