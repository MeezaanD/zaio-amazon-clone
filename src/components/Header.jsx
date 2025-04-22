import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { FiMapPin, FiSearch, FiShoppingCart } from "react-icons/fi";
import amazonLogo from "../assets/amazon_logo.png";
import "../styles/header.css";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cart } = useCart() || { cart: [] };

  const handleLogout = () => {
    localStorage.removeItem("sessionToken");
    logout();
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header_left">
        <Link to="/" className="header_logo">
          <img src={amazonLogo} alt="Amazon Logo" />
          <span>.co.za</span>
        </Link>
        <div className="header_location">
          <FiMapPin size={20} className="header_locationIcon" />
          <div className="header_locationText">
            <span className="header_optionLineOne">Delivering to Cape Town 7945</span>
            <span className="header_optionLineTwo clickable">Update location</span>
          </div>
        </div>
      </div>

      <div className="header_search">
        <select className="header_searchFilter">
          <option value="all">All Departments</option>
          <option value="Arts, Crafts & Sewing">Arts, Crafts & Sewing</option>
          <option value="Baby">Baby</option>
          <option value="Beauty">Beauty</option>
          <option value="Books">Books</option>
          <option value="Electronics & Photo">Electronics & Photo</option>
          <option value="Gift Cards">Gift Cards</option>
          <option value="Health & Personal Care">Health & Personal Care</option>
          <option value="Home & Kitchen">Home & Kitchen</option>
          <option value="Office Products">Office Products</option>
          <option value="Pet Supplies">Pet Supplies</option>
          <option value="Sports & Outdoors">Sports & Outdoors</option>
          <option value="Toys & Games">Toys & Games</option>
          <option value="Video Games">Video Games</option>
        </select>
        <input
          type="text"
          className="header_searchInput"
          placeholder="Search Amazon.co.za"
        />
        <button className="header_searchIcon">
          <FiSearch size={20} />
        </button>
      </div>

      <div className="header_right">
        <div className="header_optionDropdown">
          <span className="header_optionLineOne">
            Hello, {user ? user.email : "Sign in"}
          </span>
          {user ? (
            <span className="header_optionLineTwo clickable" onClick={handleLogout}>
              Sign Out
            </span>
          ) : (
            <span className="header_optionLineTwo clickable">Account & Lists</span>
          )}

          {!user && (
            <div className="dropdown">
              <button className="dropdown__signin" onClick={() => navigate("/login")}>
                Sign In
              </button>
              <div className="dropdown__newCustomer">
                <span>New customer?</span>
                <Link to="/signup">Start here</Link>
              </div>
            </div>
          )}
        </div>

        <div className="header_option">
          <span className="header_optionLineOne">Returns</span>
          <span className="header_optionLineTwo">& Orders</span>
        </div>

        <Link to="/checkout" className="header_optionBasket">
          <div className="header_checkoutBasket">
            <span className="header_basketCount">{cart.length}</span>
            <FiShoppingCart size={22} />
          </div>
          <span className="header_optionLineTwo">Basket</span>
        </Link>
      </div>
    </header>

  );
};

export default Header;
