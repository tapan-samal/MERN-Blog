import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
        <img src={require("../../assets/tapan11.jpeg")} alt="logo" />
      <div className="footer-left">
        <h3>Commerce Coder</h3>
        <p>Author: Tapan Kumar Samal</p>
        <p>copyright @ commer coder.</p>
      </div>
      <div className="footer-right">
        <Link className="flink" to="">Home</Link>
        <Link className="flink"  to="">Blog</Link>
        <Link className="flink"  to="">About</Link>
        <Link className="flink"  to="">Contact</Link>
      </div>
    </div>
  );
};

export default Footer;
