import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { db } from "../services/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../services/stripe";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CheckoutProduct from "../components/CheckoutProduct";
import PaymentForm from "../components/PaymentForm";
import "../styles/CheckoutPage.css";

const CheckoutPage = () => {
  const { cart, calculateTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [selectedItems, setSelectedItems] = useState(cart.map(() => true));

  const handlePlaceOrder = async () => {
    if (!user) {
      alert("Please login to place an order.");
      return;
    }

    try {
      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        items: cart.filter((_, index) => selectedItems[index]),
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

  const handleSelectionChange = (index) => {
    const updatedSelection = [...selectedItems];
    updatedSelection[index] = !updatedSelection[index];
    setSelectedItems(updatedSelection);
  };

  const calculateSelectedTotal = () => {
    return cart
      .filter((_, index) => selectedItems[index])
      .reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const selectedItemCount = selectedItems.filter(Boolean).length;

  return (
    <>
      <Header />
      <div className="checkout-container">
        <h2>Shopping Cart</h2>
        <div className="checkout-content">
          <div className="product-table">
            <table>
              <tbody>
                {cart.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="empty-cart-message">
                      Your cart is empty.
                    </td>
                  </tr>
                ) : (
                  cart.map((item, index) => (
                    <CheckoutProduct
                      key={item.id}
                      {...item}
                      onSelectChange={() => handleSelectionChange(index)}
                    />
                  ))
                )}
              </tbody>
            </table>

            <h3 className="grandTotal">
              Subtotal ({selectedItemCount} {selectedItemCount === 1 ? "item" : "items"}): R
              {calculateSelectedTotal().toFixed(2)}
            </h3>

          </div>

          <div>
            <Elements stripe={stripePromise}>
              <PaymentForm />
            </Elements>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;