import React from "react";
import Header from "../components/Header"; 
import Footer from "../components/Footer";
import Product from "../components/Product";

const products = [
  {
    id: 1,
    title: "Product 1",
    image: "/path/to/image1.jpg",
    price: 29.99,
    description: "This is product 1",
    rating: 4
  },
  {
    id: 2,
    title: "Product 2",
    image: "/path/to/image2.jpg",
    price: 49.99,
    description: "This is product 2",
    rating: 5
  }
];

const HomePage = () => {
  return (
    <>
      <Header />
      <div className="home-page">
        {products.map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default HomePage;