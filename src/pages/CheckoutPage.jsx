import React from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { db } from "../services/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../services/stripe";
import CheckoutProduct from "../components/CheckoutProduct";
import PaymentForm from "../components/PaymentForm";

const CheckoutPage = () => {
  const { cart, calculateTotal, clearCart } = useCart();
  const { user } = useAuth();

  const handlePlaceOrder = async () => {
    if (!user) {
      alert("Please login to place an order.");
      return;
    }

    try {
      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        items: cart,
        total: calculateTotal(),
        createdAt: serverTimestamp(),
      });

      alert("Order placed successfully!");
      clearCart();
    } catch (error) {
      console.error("Order error:", error);
      alert("Failed to place order.");
    }
  };

  if (cart.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div>
      <h2>Checkout</h2>
      {cart.map((item) => (
        <CheckoutProduct key={item.id} {...item} />
      ))}
      <h3>Total: R{calculateTotal().toFixed(2)}</h3>
      <button onClick={handlePlaceOrder}>Place Order (No Payment)</button>

      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    </div>
  );
};

export default CheckoutPage;