import React, { useEffect, useState } from "react";
import "../home/user-home.css";
import axios from "axios";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getBlog();
  }, []);

  const getBlog = () => {
    axios
      .get("http://localhost:5000/blog")
      .then((response) => {
        console.log(response);
        setBlogs(response.data.blog);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
        <h1 className="category-title">Blogs</h1>
        <div className="latest-blog">
          {blogs.map((blog) => (
            <div className="card-blog" key={blog._id}>
              <img src={blog.imageUrl} alt="Category" />
              <h3>{blog.title}</h3>
              <p>{blog.category}</p>
            </div>
          ))}
        </div>
    </>
  );
};

export default Blogs;
