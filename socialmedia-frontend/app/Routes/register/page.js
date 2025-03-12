"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./style.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
      setMessage("User created successfully");
    } else {
      setMessage("Error creating user");
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
          <button className="setup-button" type="submit">
            Setup Account
          </button>
          <Link href="/Routes/login">
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
