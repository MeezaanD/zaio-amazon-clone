import React, { useState } from "react";
import { auth } from "../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import amazonLogo from "/src/assets/amazon-dark-text.jpg";
import "../styles/Signup.css";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccessMessage("Signup successful!");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/");
      }, 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup-container">
      <img src={amazonLogo} alt="Amazon" className="signup-logo" />

      <div className="signup-form-container">
        <h1>Create account</h1>

        {successMessage && <div className="alert-success">{successMessage}</div>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="password-tip">
            Passwords must be at least 6 characters.
          </div>
          <input
            type="password"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit">Continue</button>
        </form>

        <div className="signup-terms">
          By creating an account, you agree to Amazon's{" "}
          <a href="#">Conditions of Use & Sale</a>. Please see our{" "}
          <a href="#">Privacy Notice</a>, our <a href="#">Cookies Notice</a> and
          our <a href="#">Interest-Based Ads Notice</a>.
        </div>
      </div>

      <div className="signup-signin">
        Already have an account?
        <Link to="/login">Sign in</Link>
      </div>
    </div>
  );
};

export default SignupPage;
