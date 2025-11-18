// frontend/src/Signup.jsx
import React, { useState } from "react";
import api from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/register/", {
        username,
        email,
        password,
      });
      toast.success("Account created successfully!");
      navigate("/");
      console.log("API:", import.meta.env.VITE_API_URL);
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
      toast.error("Error creating account.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleSignup} className="auth-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email (optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <a href="/">Login here</a>
      </p>
    </div>
  );
}

export default Signup;
