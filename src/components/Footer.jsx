import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer_backToTop">
        <a className="footer_backToTopText" href="#">Back to top</a>
      </div>

      <div className="footer_links">
        <div className="footer_column">
          <h4>Get to Know Us</h4>
          <ul>
            <li><Link to="#">Careers</Link></li>
            <li><Link to="#">Legal Notice</Link></li>
            <li><Link to="#">Welcome to Amazon.co.za</Link></li>
          </ul>
        </div>
        <div className="footer_column">
          <h4>Make Money with Us</h4>
          <ul>
            <li><Link to="#">Advertise Your Products</Link></li>
            <li><Link to="#">Sell on Amazon</Link></li>
            <li><Link to="#">Supply to Amazon</Link></li>
          </ul>
        </div>
        <div className="footer_column">
          <h4>Amazon Payment Methods</h4>
          <ul>
            <li><Link to="#">Payment Methods Help</Link></li>
          </ul>
        </div>
        <div className="footer_column">
          <h4>Let Us Help You</h4>
          <ul>
            <li><Link to="#">Track Packages or View Orders</Link></li>
            <li><Link to="#">Shipping & Delivery</Link></li>
            <li><Link to="#">Returns & Replacements</Link></li>
            <li><Link to="#">Recalls and Product Safety Alerts</Link></li>
            <li><Link to="#">Customer Service</Link></li>
            <li><Link to="#">Amazon Mobile App</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer_branding">
        <img src="/src/assets/amazon_logo.png" alt="Amazon Logo" />
        <span>South Africa</span>
      </div>

      <div className="footer_legal-section">
        <div className="footer_legal">
          <Link to="#">Conditions of Use & Sale</Link>
          <Link to="#">Privacy Notice</Link>
          <Link to="#">Cookies Notice</Link>
          <Link to="#">Legal Notice</Link>
          <Link to="#">Interest-Based Ads Notice</Link>
        </div>
        <p>© 1996-2025, Amazon.com, Inc. or its affiliates</p>

      </div>
    </footer>
  );
};

export default Footer;
