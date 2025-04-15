import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Product from "../components/Product";
import { fetchProducts } from "../services/productService";

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

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <>
      <Header />
      <div className="home-page" style={styles.container}>
        {products.map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </div>
      <Footer />
    </>
  );
};

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
    padding: "20px",
  },
};

export default HomePage;