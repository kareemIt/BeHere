"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './style.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      setMessage('Login successful');
      router.push('/Routes/home'); 
    } else {
      setMessage('Invalid credentials');
    }
  };

  return (
    <div>
      <h1 className='heading'>BeHere</h1>
      <div className='container'>
        <h1 className='title'>Login</h1>
        <form onSubmit={handleSubmit} className='form'>
          <input
            type="text"
            value={username}
            placeholder='username'
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          <Link href="/Routes/register">
            <button>Register</button>
          </Link>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Login;
