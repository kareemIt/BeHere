import { apiClient } from "./apiClient";

export const getUserProfile = (userId) => {
    return apiClient(`users/${userId}`, "GET", null, true);
};

export const updateUserProfile = (userId, userData) => {
    return apiClient(`users/${userId}`, "PUT", userData, true);
};
