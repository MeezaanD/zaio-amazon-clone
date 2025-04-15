import React from "react";

const Product = ({ title, image, price, description, rating }) => {
  return (
    <div className="product">
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>
      <p>${price}</p>
      <p>Rating: {rating}</p>
      <button>Add to Basket</button>
    </div>
  );
};

export default Product;