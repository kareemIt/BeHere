"use client";

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useContext } from 'react';
import UserContext from './context/UserContext';
import styles from './Routes/login/style.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { setAccessToken, setUsername: setContextUsername, setUserId } = useContext(UserContext);
  const router = useRouter();

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch(`${BACKEND_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || 'Login failed');
        return;
      }

      // Validate all required fields
      if (!data.accessToken || !data.userId || !data.username) {
        console.error('Invalid response structure');
        setMessage('Server response missing required data');
        return;
      }

      // Update context
      setAccessToken(data.accessToken);
      setContextUsername(data.username);
      setUserId(data.userId);

      // Store in localStorage
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('username', data.username);
      localStorage.setItem('userId', data.userId.toString());

      router.push('/home');
      
    } catch (error) {
      console.error('Login error');
      setMessage(error.message || 'Network error occurred during login');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="login-heading">BeHere</h1>
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <button type="submit" className="login-button">Login</button>
          <Link href="/register">
            <button type="button" className="register-button">Register</button>
          </Link>
        </form>
        {message && <p className="login-message">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
