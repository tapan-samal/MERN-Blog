import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nav-container">
      <div className="nav-logo"><span className="logo">Commerce </span> <span className="coder">Coder</span></div>
      <div className="nav-link">
        <Link className="link" to="/home">Home</Link>
        <Link className="link" to="/blog">Blog</Link>
        <Link className="link" to="/about">About</Link>
        <Link className="link" to="/contact">Contact</Link>
      </div>
      <div className="nav-login">
        <Link to="/admin/login"><button>Login</button></Link>
      </div>
    </div>
  );
};

export default Navbar;
