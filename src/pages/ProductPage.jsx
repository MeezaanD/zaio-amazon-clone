import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../services/productService";
import { useCart } from "../context/CartContext";
import "../styles/ProductPage.css";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useCart();

  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);
  const imageRef = useRef();
  const zoomSize = 2;

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const productData = await fetchProductById(id);
        setProduct(productData);
      } catch (error) {
        setError("Product not found");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    const productDetails = {
      id: product.id,
      name: product.name,
      description: product.description,
      image: product.image,
      price: product.price,
    };
    addToCart(productDetails);
  };

  const handleMouseMove = (e) => {
    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setLensPosition({ x, y });
  };

  if (loading) {
    return <p>Loading product...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <Header />
      <div className="product-page">
        <div className="product-details">
          <div
            className="product-image"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setShowZoom(true)}
            onMouseLeave={() => setShowZoom(false)}
          >
            <img ref={imageRef} src={product.image} alt={product.name} />

            {showZoom && (
              <>
                <div
                  className="zoom-lens"
                  style={{
                    top: lensPosition.y - 50,
                    left: lensPosition.x - 50,
                  }}
                ></div>

                <div className="zoom-window">
                  <img
                    src={product.image}
                    alt="Zoom"
                    style={{
                      transform: `translate(-${lensPosition.x * zoomSize}px, -${lensPosition.y * zoomSize}px) scale(${zoomSize})`,
                      transformOrigin: "top left",
                    }}
                  />
                </div>
              </>
            )}
          </div>

          <div className="product-info">
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <h4>R{product.price}</h4>

            <div className="product-actions">
              <button onClick={handleAddToCart} className="add-to-cart-btn">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
