"use client";

import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import jwtDecode from 'jwt-decode';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [userId, setUserId] = useState(null);
  const router = useRouter();
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const refreshToken = async () => {
    try {
      const refreshTokenValue = localStorage.getItem('refreshToken');
      console.log('Attempting token refresh');
      
      if (!refreshTokenValue) {
        throw new Error('No refresh token available');
      }

      const response = await fetch(`${BACKEND_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ refreshToken: refreshTokenValue }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Token refresh successful');
        localStorage.setItem('accessToken', data.accessToken);
        setAccessToken(data.accessToken);
        if (data.refreshToken) {
          localStorage.setItem('refreshToken', data.refreshToken);
        }
        return data.accessToken;
      } else {
        const errorData = await response.json();
        console.error('Token refresh failed:', errorData);
        throw new Error('Token refresh failed');
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      localStorage.clear(); // Clear all auth data
      router.push('/Routes/login');
      throw error;
    }
  };

  const fetchWithToken = async (url, options = {}) => {
    let token = localStorage.getItem('accessToken');
    
    if (!token) {
      console.error('No access token found');
      throw new Error('No access token');
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          ...(options.headers || {})
        },
        credentials: 'include' // Add this line
      });

      if (response.status === 401 || response.status === 403) {
        console.log('Token expired or invalid, attempting refresh');
        token = await refreshToken();
        
        // Retry the request with new token
        return fetch(url, {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
            ...(options.headers || {})
          },
          credentials: 'include'
        });
      }

      return response;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (token) {
      setAccessToken(token);
      setUsername(localStorage.getItem('username'));
      setUserId(localStorage.getItem('userId'));
    }
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
  }, []);

  return (
    <UserContext.Provider value={{ 
      accessToken, 
      setAccessToken, 
      username, 
      setUsername,
      userId,
      setUserId,
      fetchWithToken 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
