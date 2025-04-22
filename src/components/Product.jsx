import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Product = ({ id, name, description, image, price }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const product = { id, name, description, image, price };
    addToCart(product);
  };

  return (
    <div style={styles.card}>
      <Link to={`/product/${id}`} style={styles.link}>
        <img src={image} alt={name} style={styles.image} />
        <h3>{name}</h3>
        <p>{description}</p>
        <h4>R{price}</h4>
      </Link>
      <button onClick={handleAddToCart} style={styles.addButton}>
        Add to Cart
      </button>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "15px",
    width: "300px",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "10px",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
};

export default Product;
