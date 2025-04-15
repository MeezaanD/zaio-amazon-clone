import React from "react";
import CheckoutProduct from "../components/CheckoutProduct";

const basket = [
  {
    id: 1,
    title: "Product 1",
    image: "/path/to/image1.jpg",
    price: 29.99
  }
];

const CheckoutPage = () => {
  return (
    <div className="checkout-page">
      {basket.map((item) => (
        <CheckoutProduct key={item.id} {...item} />
      ))}
    </div>
  );
};

export default CheckoutPage;