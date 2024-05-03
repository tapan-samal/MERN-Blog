import axios from "axios";
import React, { useEffect, useState } from "react";
import { deleteObject, getStorage, ref as storageRef } from "firebase/storage";
import { app } from "../../firebase";
import { useNavigate } from "react-router-dom";
import "../categoryLIsts/categoryLists.css";

const BlogLists = () => {
  const [blogLists, setBlogLists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getBlogLists();
  }, []);

  const getBlogLists = () => {
    axios
      .get("http://localhost:5000/blog")
      .then((response) => {
        console.log(response.data.blog);
        setBlogLists(response.data.blog.reverse());
      })
      .catch((error) => {
        console.log("Error::", error);
      });
  };

  const handleUpdateBlog = (blog) => {
    navigate("/admin/dashboard/update-blog", {state: {data: blog}});
  };

  const handleDeleteBlog = (blog) => {
    if (window.confirm(`Are you confirm to delete "${blog.title}" ?`)) {
      const storage = getStorage(app);
      const myRef = storageRef(storage, `${blog.imageUrl}`);
      deleteObject(myRef)
        .then((result) => {
          axios
            .delete("http://localhost:5000/blog/" + blog._id,
            {
              headers: {
                Authorization: "Bearer "+localStorage.getItem("token")
              },
            }
          )
            .then((response) => {
              console.log(response);
              getBlogLists();
            })
            .catch((error) => {
              console.log("Error: ", error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <h2 className="category-header">Blog Lists</h2>
      <div className="category-lists">
        {blogLists.map((blog) => (
          <div className="card-lists" key={blog._id}>
            <h3>{blog.title}</h3>
            <img src={blog.imageUrl} alt="Category" width={300} />
            <button onClick={() => handleUpdateBlog(blog)}>Update</button>{" "}
            <button onClick={() => handleDeleteBlog(blog)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default BlogLists;
