"use client";

import { useState, useContext } from 'react';
import Link from "next/link";
import UserContext from '../../context/UserContext';
import styles from "./style.css";
import { useRouter } from 'next/navigation';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const { setAccessToken, setUsername: setContextUsername, setUserId } = useContext(UserContext);
  const router = useRouter();

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();
  
    if (!trimmedUsername || !trimmedEmail || !trimmedPassword) {
      setMessage("Please fill out all fields");
      return;
    }
  
    if (trimmedUsername.length === 0) {
      setMessage("Username not valid");
      return;
    }
  
    if (trimmedPassword !== trimmedConfirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
  
    try {
      const response = await fetch(`${BACKEND_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: trimmedUsername, email: trimmedEmail, password: trimmedPassword }),
      }).catch(() => null); // Prevents fetch errors from being logged
  
      if (!response || !response.ok) {
        setMessage("Account already exists");
        return;
      }
  
      setMessage("User created successfully");
  
      const responseLogin = await fetch(`${BACKEND_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ username: trimmedUsername, password: trimmedPassword }),
      }).catch(() => null); 
  
      if (!responseLogin || !responseLogin.ok) {
        setMessage("Login failed. Please try again.");
        return;
      }
  
      const loginData = await responseLogin.json();
  
      setAccessToken(loginData.accessToken);
      setContextUsername(loginData.username);
      setUserId(loginData.userId);
  
      localStorage.setItem('accessToken', loginData.accessToken);
      localStorage.setItem('refreshToken', loginData.refreshToken);
      localStorage.setItem('username', loginData.username);
      localStorage.setItem('userId', loginData.userId.toString());
  
      router.push('/home');
  
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    }
  };
  
  

  return (
    <div className="register-page">
      <div className="register-container">
        <h1 className="heading">BeHere</h1>
        <h2 className="title">Register</h2>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button className="setup-button" type="submit">
            Setup Account
          </button>
          <Link href="/login">
            <button type="button" className="login-button-register">
              Login
            </button>
          </Link>
        </form>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Register;
