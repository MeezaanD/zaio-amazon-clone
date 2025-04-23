import React from "react";
import { Link } from "react-router-dom";
import "../styles/Product.css";

const Product = ({ id, name, image, price }) => {
  return (
    <Link to={`/product/${id}`} className="product-slide">
      <img src={image} alt={name} className="product-slide-image" />
      <p className="product-slide-price">R{price}</p>
      <p className="product-slide-name">
        {name.length > 20 ? name.slice(0, 20) + "..." : name}
      </p>
    </Link>
  );
};

export default Product;
