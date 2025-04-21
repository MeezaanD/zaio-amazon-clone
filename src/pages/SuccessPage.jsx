import React from "react";
import { Link } from "react-router-dom";

const SuccessPage = () => {
  return (
    <div style={styles.container}>
      <h2>🎉 Order Placed Successfully!</h2>
      <p>Thank you for your purchase. Your order has been received.</p>
      <Link to="/" style={styles.button}>Return to Home</Link>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    textAlign: "center",
  },
  button: {
    display: "inline-block",
    marginTop: "1rem",
    padding: "10px 20px",
    backgroundColor: "#333",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
  },
};

export default SuccessPage;
