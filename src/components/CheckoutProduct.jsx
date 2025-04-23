import React from "react";
import { useCart } from "../context/CartContext";
import "../styles/CheckoutProduct.css";

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
    <tr className="checkout-product">
      <td className="product-image">
        <img src={image} alt={name} />
      </td>
      <td className="product-details">
        <h3>{name}</h3>
        <div className="product-actions">
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
            className="quantity-input"
          />
          <button onClick={handleRemove} className="remove-btn">
            Remove
          </button>
        </div>
      </td>
      <td className="product-price">R{(price * quantity).toFixed(2)}</td>
    </tr>
  );
};

export default CheckoutProduct;
