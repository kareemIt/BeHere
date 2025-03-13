"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const getAccessToken = () => localStorage.getItem("accessToken");

const fetchWithToken = async (url, options = {}) => {
  let token = getAccessToken();
  if (!token) throw new Error("No access token");

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
    credentials: "include",
  });

  if (response.status === 401 || response.status === 403) {
    console.log("Token expired, attempting refresh");
    token = await refreshToken(); // Refresh token function is called here
    return fetchWithToken(url, options); // Retry with new token
  }

  if (!response.ok) throw new Error("API request failed");

  return response.json();
};

const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("No refresh token available");

    const response = await fetch(`${BACKEND_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) throw new Error("Token refresh failed");

    const data = await response.json();
    localStorage.setItem("accessToken", data.accessToken);
    if (data.refreshToken) localStorage.setItem("refreshToken", data.refreshToken);

    return data.accessToken;
  } catch (error) {
    console.error("Token refresh error:", error);
    localStorage.clear();
    throw error;
  }
};

// Custom Hook for Fetching Data
export const useFetchData = (endpoint, options = {}) => {
  return useQuery({
    queryKey: [endpoint],
    queryFn: () => fetchWithToken(`${BACKEND_URL}${endpoint}`, options),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: 1, // Retry once on failure
  });
};

// Custom Hook for Mutations (POST, PUT, DELETE)
export const useApiMutation = (endpoint, method = "POST") => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (body) => {
      return fetchWithToken(`${BACKEND_URL}${endpoint}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(); // Refresh queries on success
    },
    onError: (error) => {
      if (error.message.includes("No access token")) {
        router.push("/login"); // Redirect if auth fails
      }
    },
  });
};
