import React, { useEffect, useState } from "react";
import "./user-home.css";
import axios from "axios";
import Footer from "../footer/Footer";

const UserHome = () => {
  const [category, setCategory] = useState([]);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getCategory();
    getBlog();
  }, []);

  const getCategory = () => {
    axios
      .get("http://localhost:5000/category/latest/4")
      .then((response) => {
        console.log(response);
        setCategory(response.data.Category);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getBlog = () => {
    axios
      .get("http://localhost:5000/blog/latest/4")
      .then((response) => {
        console.log(response);
        setBlogs(response.data.Blog);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="banner">
        <div className="title">
          <h2>Welcome to :</h2>
          <h1> Commerce Coder Blog !!</h1>
          <p>Blogging is just writing - writing using a particularly effecienttype of publishing technology !</p>
        </div>
        <img src={require("../../assets/blog.jpg")} alt="" />
      </div>
      <div>
        <h1 className="category-title">Latest Category</h1>
        <div className="latest-cat">
          {category.map((cat) => (
            <div className="latest-card" key={cat._id}>
              <img src={cat.imageUrl} alt="Category" width={300} />
              <h3>{cat.name}</h3>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h1 className="category-title">Latest Blog</h1>
        <div className="latest-blog">
          {blogs.map((blog) => (
            <div className="card-blog" key={blog._id}>
              <img src={blog.imageUrl} alt="Category" width={300} />
              <h3>{blog.title}</h3>
              <p>{blog.category}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserHome;
