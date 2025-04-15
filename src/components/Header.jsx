import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Header = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart() || {};

  return (
    <header style={styles.header}>
      <h1>Amazon Clone</h1>
      <nav>
        <div style={styles.links}>
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

          
          <Link to="/checkout" style={styles.link}>
            <span style={styles.cart}>
              🛒 Cart ({cart ? cart.length : 0})
            </span>
          </Link>
        </div>
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
  cart: {
    fontSize: "1.2em",
    padding: "5px",
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