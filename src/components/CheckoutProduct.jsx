import React from "react";
import { useCart } from "../context/CartContext";

const CheckoutProduct = ({ id, name, price, image, quantity }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (e) => {
    const newQuantity = Number(e.target.value);
    updateQuantity(id, newQuantity);
  };

  const handleRemove = () => {
    removeFromCart(id);
  };

  return (
    <div style={styles.card}>
      <img src={image} alt={name} style={styles.image} />
      <h3>{name}</h3>
      <h4>R{price}</h4>
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={handleQuantityChange}
        style={styles.input}
      />
      <button onClick={handleRemove} style={styles.removeButton}>
        Remove
      </button>
      <h4>Total: R{price * quantity}</h4>
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
  input: {
    width: "50px",
    padding: "5px",
    marginTop: "10px",
  },
  removeButton: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "5px",
    marginTop: "10px",
  },
};

export default CheckoutProduct;
