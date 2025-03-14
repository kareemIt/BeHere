"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useApiMutation } from "../../utils/useApp";
import UserContext from "../../context/UserContext";  // Import UserContext
import styles from "./style.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  
  // Destructure the necessary functions and state from UserContext
  const { setAccessToken, setUsername: setContextUsername, setUserId } = useContext(UserContext);
  
  const { mutate: loginUser, isPending } = useApiMutation();
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(`${BACKEND_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      console.log(data)
      if (!response.ok) {
        setMessage(data.message || "Login failed");
        return;
      }

      // Ensure required values exist
      if (!data.accessToken || !data.userId || !data.username) {
        setMessage("Server response missing required data");
        return;
      }

      console.log("Login successful, storing tokens...");

      // Store in localStorage
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken || ""); // Some APIs don't return this
      localStorage.setItem("username", data.username);
      localStorage.setItem("userId", data.userId.toString());

      // Update context state using context setters
      setAccessToken(data.accessToken);
      setContextUsername(data.username);
      setUserId(data.userId);

      console.log("Redirecting to home...");
      router.push("/home");
    } catch (error) {
      setMessage("Network error occurred during login try again in a minute");
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
          <button type="submit" className="login-button" disabled={isPending}>
            {isPending ? "Logging in..." : "Login"}
          </button>
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
