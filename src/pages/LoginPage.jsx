import React, { useState } from "react";
import { auth } from "../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook for navigating to different routes

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    try {
      // Sign in the user with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Get the user's token
      const token = await userCredential.user.getIdToken();

      // Store the token in sessionStorage (or localStorage)
      sessionStorage.setItem("sessionToken", token);

      // Redirect to the home page
      navigate("/");

      alert("Login successful!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default LoginPage;