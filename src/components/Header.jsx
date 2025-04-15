import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Correct import for useAuth

const Header = () => {
  const { user, logout } = useAuth(); // Access user and logout from AuthContext

  return (
    <header style={styles.header}>
      <h1>Amazon Clone</h1>
      <nav>
        {user ? (
          <div style={styles.userSection}>
            <span style={styles.email}>{user.email}</span>
            <button onClick={logout} style={styles.logoutButton}>
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link to="/login" style={styles.link}>
              Login
            </Link>
            <Link to="/signup" style={styles.link}>
              Signup
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: "#282c34",
    padding: "10px 20px",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  link: {
    color: "white",
    textDecoration: "none",
    margin: "0 10px",
  },
  userSection: {
    display: "flex",
    alignItems: "center",
  },
  email: {
    marginRight: "10px",
    color: "white",
  },
  logoutButton: {
    backgroundColor: "white",
    color: "#282c34",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "5px",
  },
};

export default Header;