import React from "react";

const CheckoutProduct = ({ title, image, price }) => {
  return (
    <div className="checkout-product">
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p>${price}</p>
    </div>
  );
};

export default CheckoutProduct;