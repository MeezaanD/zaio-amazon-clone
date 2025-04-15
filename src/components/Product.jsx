import React from "react";

const Product = ({ name, description, image, price }) => {
  return (
    <div style={styles.card}>
      <img src={image} alt={name} style={styles.image} />
      <h3>{name}</h3>
      <p>{description}</p>
      <h4>R{price}</h4>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "15px",
    width: "300px",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "10px",
  },
};

export default Product;