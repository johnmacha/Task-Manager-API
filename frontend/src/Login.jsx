import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import { toast } from 'react-toastify';
import api from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/login/", {
        username,
        password,
      });

      // Save tokens in localStorage
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      navigate("/plan");

      toast.success("Login successful! Welcome aboard🤝");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className = "auth-container">
      <h2>Login To PlanIt</h2>
    <form onSubmit={handleLogin} className="auth-form">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
            <p>
        Don't have an account? <a href="/signup">Signup here</a>
      </p>
      </form>
      </div>
  );
}

export default Login;
