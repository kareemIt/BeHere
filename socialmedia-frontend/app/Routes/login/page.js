"use client";

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useContext } from 'react';
import UserContext from '../../context/UserContext';
import './style.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { setUserId, setToken } = useContext(UserContext);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const token = await response.json(); 
      setUserId(token.userId);
      localStorage.setItem('jwtToken', token.token);
      setToken(token.token);
      localStorage.setItem('userId', token.userId);
      localStorage.setItem('username', username);  
      router.push('/routes/home'); 
    } else {
      setMessage('Invalid credentials');
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
          <Link href="/routes/register">
            <button type="button" className="register-button">Register</button>
          </Link>
        </form>
        {message && <p className="login-message">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
