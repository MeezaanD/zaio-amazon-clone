import React, { useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { db } from "../services/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { cart, calculateTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    const cardNumberElement = elements.getElement(CardNumberElement);

    try {
      const { error, token } = await stripe.createToken(cardNumberElement);

      if (error) {
        console.error(error.message);
        alert("Payment failed: " + error.message);
        setLoading(false);
        return;
      }

      // Save order to Firestore
      await addDoc(collection(db, "orders"), {
        items: cart,
        total: calculateTotal(),
        createdAt: serverTimestamp(),
        paymentToken: token.id,
      });

      clearCart();
      navigate("/success");
    } catch (err) {
      console.error("Order save error:", err);
      alert("Something went wrong with saving your order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Payment Details</h2>

      <label>Card Number</label>
      <CardNumberElement options={styles.cardElement} style={styles.input} />

      <label>Expiry Date</label>
      <CardExpiryElement options={styles.cardElement} style={styles.input} />

      <label>CVV</label>
      <CardCvcElement options={styles.cardElement} style={styles.input} />

      <button type="submit" disabled={!stripe || loading} style={styles.button}>
        {loading ? "Processing..." : "Pay R" + calculateTotal()}
      </button>
    </form>
  );
};

const styles = {
  form: {
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
  },
  cardElement: {
    style: {
      base: {
        fontSize: "16px",
        color: "#32325d",
        "::placeholder": { color: "#aab7c4" },
      },
      invalid: { color: "#fa755a" },
    },
  },
  input: {
    padding: "10px",
    marginBottom: "15px",
    width: "100%",
    display: "block",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#5C67F2",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
};

export default PaymentForm;
