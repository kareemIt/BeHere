"use client";

import { useState } from 'react';
import styles from './style.css';
import Link from 'next/link';

const Login = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8080/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
      setMessage('User created successfully');
    } else {
      setMessage('Error creating user');
    }
  };

  return (
    <div>
      <h1 className='heading'>BeHere</h1>
      <div className='container'>
        <h1 className='title'>Register</h1>
        <form onSubmit={handleSubmit} className='form'>
          <input
            type="text"
            value={username}
            placeholder='username'
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            value={email}
            placeholder='email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700" type="submit">Login</button>
          <Link href="/login">
            <button>Setup Account</button>
          </Link>
        </form>
        {message && <p>{message}</p>}
      </div >
    </div>
  );
};

export default Login;
