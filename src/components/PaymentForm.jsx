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
import { useAuth } from "../context/AuthContext";
import { db } from "../services/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "../styles/PaymentForm.css";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { cart, calculateTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You need to be logged in to make a payment.");
      navigate("/login");
      return;
    }

    if (!stripe || !elements) return;

    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);

    if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
      alert("Please complete all required payment fields.");
      return;
    }

    const numberComplete = cardNumberElement._complete;
    const expiryComplete = cardExpiryElement._complete;
    const cvcComplete = cardCvcElement._complete;

    if (!numberComplete || !expiryComplete || !cvcComplete) {
      alert("Please complete all required fields.");
      return;
    }

    setLoading(true);

    try {
      const { error, token } = await stripe.createToken(cardNumberElement);

      if (error) {
        console.error(error.message);
        alert("Payment failed: " + error.message);
        setLoading(false);
        return;
      }

      await addDoc(collection(db, "orders"), {
        userId: user.uid,
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

  const cardElementStyle = {
    style: {
      base: {
        fontSize: "16px",
        color: "#32325d",
        "::placeholder": { color: "#aab7c4" },
      },
      invalid: { color: "#fa755a" },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <h2>Payment Details</h2>

      <label>Card Number</label>
      <div className="payment-input-wrapper">
        <CardNumberElement options={cardElementStyle} />
      </div>

      <label>Expiry Date</label>
      <div className="payment-input-wrapper">
        <CardExpiryElement options={cardElementStyle} />
      </div>

      <label>CVV</label>
      <div className="payment-input-wrapper">
        <CardCvcElement options={cardElementStyle} />
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className="payment-submit-btn"
      >
        {loading ? "Processing..." : `Pay R${calculateTotal().toFixed(2)}`}
      </button>
    </form>
  );
};

export default PaymentForm;
