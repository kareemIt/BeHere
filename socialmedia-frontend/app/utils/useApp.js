"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Function to fetch data with authentication
const fetchWithAuth = async (url, options = {}) => {
  let token = localStorage.getItem("accessToken");
  if (!token) throw new Error("No access token");

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Bearer ${token}`,
      ...(options.headers || {})
    },
    credentials: "include"
  });

  if (response.status === 401 || response.status === 403) {
    console.log("Token expired or invalid, attempting refresh");
    token = await refreshToken();
    return fetchWithAuth(url, options); // Retry with new token
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "API request failed");
  }

  return response.json();
};

// Function to refresh token
const refreshToken = async () => {
  const refreshTokenValue = localStorage.getItem("refreshToken");
  if (!refreshTokenValue) throw new Error("No refresh token available");

  const response = await fetch(`${BACKEND_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken: refreshTokenValue })
  });

  if (!response.ok) {
    localStorage.clear();
    throw new Error("Token refresh failed");
  }

  const data = await response.json();
  localStorage.setItem("accessToken", data.accessToken);
  if (data.refreshToken) {
    localStorage.setItem("refreshToken", data.refreshToken);
  }

  return data.accessToken;
};

// Custom hook for GET requests
export const useFetchData = (endpoint, options = {}) => {
  return useQuery({
    queryKey: [endpoint],
    queryFn: () => fetchWithAuth(`${BACKEND_URL}${endpoint}`, options),
    staleTime: 5 * 60 * 1000, // Cache for 5 mins
    retry: 1
  });
};

// Custom hook for mutations (POST, PUT, DELETE)
export const useApiMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ endpoint, method = "POST", body }) =>
      fetchWithAuth(`${BACKEND_URL}${endpoint}`, {
        method,
        body: JSON.stringify(body)
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(); // Invalidate cache after mutation
    }
  });
};
