import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmitBtn = (event) => {
    event.preventDefault();
    console.log(userName, password);
    axios
      .post("http://localhost:5000/user/admin/login", {
        username: userName,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("email: ", res.data.email);
        localStorage.setItem("fullName: ", res.data.fullName);
        localStorage.setItem("token: ", res.data.token);
        navigate("/admin/dashboard");
      })
      .catch((err) => {
        console.log("Error>>: ", err);
      });
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleSubmitBtn}>
        <img src={require("../../assets/tapan11.jpeg")} alt="profile" />
        <h1>Coder Blog</h1>
        <input onChange={(e) => setUserName(e.target.value)} type="text" placeholder="username"/>
        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password"/>
        <input type="submit" className="login-btn" value="Login" />
      </form>
    </div>
  );
};

export default Login;
