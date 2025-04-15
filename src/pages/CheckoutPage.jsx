import React from "react";
import { useCart } from "../context/CartContext";
import CheckoutProduct from "../components/CheckoutProduct";

const CheckoutPage = () => {
  const { cart, calculateTotal } = useCart();

  if (cart.length === 0) {
    return <p>No products selected. Please add some products to your cart.</p>;
  }

  const total = calculateTotal();

  return (
    <div className="checkout-page">
      {cart.map((item) => (
        <CheckoutProduct key={item.id} {...item} />
      ))}
      <div style={styles.totalContainer}>
        <h3>Total Price: R{total}</h3>
      </div>
    </div>
  );
};

const styles = {
  totalContainer: {
    marginTop: "20px",
    padding: "10px",
    backgroundColor: "#f9f9f9",
    textAlign: "center",
    borderRadius: "10px",
  },
};

export default CheckoutPage;