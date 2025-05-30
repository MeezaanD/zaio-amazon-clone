import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Product from "../components/Product";
import { fetchProducts } from "../services/productService";
import "../styles/HomePage.css";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <>
      <Header />
      <div className="home-wrapper">
        <div className="home-banner">
          <h2 className="home-heading">Today's Deals</h2>
          <div className="product-grid">
            {loading ? (
              <div className="loading-message">Loading products...</div>
            ) : (
              products.map((product) => (
                <Product key={product.id} {...product} />
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;