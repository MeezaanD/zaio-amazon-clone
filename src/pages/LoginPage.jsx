import React, { useState } from "react";
import { auth } from "../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import amazonLogo from "../assets/amazon-dark-text.jpg";
import "../styles/Login.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      sessionStorage.setItem("sessionToken", token);
      setSuccessMessage("Login successful!");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/");
      }, 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <img src={amazonLogo} alt="Amazon" className="login-logo" />

      <div className="login-form-container">
        <h1>Sign In</h1>

        {successMessage && <div className="alert-success">{successMessage}</div>}
        {error && <p style={{ color: "red" }}>{error}</p>}

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

        <div className="login-help">
          <Link to="#">Need help?</Link>
        </div>
      </div>

      <div className="login-create-account">
        New to Amazon? <br />
        <Link to="/signup">Create your Amazon account</Link>
      </div>
    </div>
  );
};

export default LoginPage;
