import React, { useEffect, useState } from "react";
import "../addCategory/addCategory.css";
import {
  getDownloadURL,
  getStorage,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { app } from "../../firebase";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import "./add-blog.css";
import ReactQuill from "react-quill";

const AddBlog = () => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogCategory, setBlogCategory] = useState("");
  const [blog, setBlog] = useState("");
  const [uploadFile, setUploadFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [categoryLists, setCategoryLists] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    getCategoryLists();
    console.log(location.state);
    if (location.state !== null) {
      setBlogTitle(location.state.data.title);
      setBlogCategory(location.state.data.category);
      setBlog(location.state.data.description);
      setImageUrl(location.state.data.imageUrl);
    }
  }, []);

  const getCategoryLists = () => {
    axios
      .get("http://localhost:5000/category")
      .then((response) => {
        console.log(response.data.category);
        setCategoryLists(response.data.category);
      })
      .catch((error) => {
        console.log("Error::", error);
      });
  };

  const handleFileUpload = (e) => {
    setUploadFile(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const handleBlogEditor = (content, delta, source, editor) => {
    console.log("Quill", content);
    setBlog(content);
  };

  const handleSubmitBtn = async (event) => {
    event.preventDefault();
    if (location.state == null) {
      const storage = getStorage(app);
      const myRef = storageRef(storage, `blog/${Date.now()}`);
      await uploadBytes(myRef, uploadFile);
      const uploadedImageUrl = await getDownloadURL(myRef);
      console.log(uploadedImageUrl);

      axios.post("http://localhost:5000/blog",
          {
            title: blogTitle,
            category: blogCategory,
            description: blog,
            imageUrl: uploadedImageUrl,
          },
          {
            headers: {
              Authorization: "Bearer "+localStorage.getItem("token")
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          navigate("/admin/dashboard/blog");
        })
        .catch((err) => {
          console.log("Error>>: ", err);
        });
    } else {
      if (uploadFile == null) {
        axios
          .put("http://localhost:5000/blog/" + location.state.data._id, {
            title: blogTitle,
            category: blogCategory,
            description: blog,
            imageUrl: location.state.data.imageUrl,
          })
          .then((res) => {
            console.log(res.data);
            navigate("/admin/dashboard/blog");
          })
          .catch((err) => {
            console.log("Error>>: ", err);
          });
      } else {
        const storage = getStorage(app);
        const myRef = storageRef(storage, `${location.state.data.imageUrl}`);
        await uploadBytes(myRef, uploadFile);
        const uploadedImageUrl = await getDownloadURL(myRef);
        console.log(uploadedImageUrl);

        axios
          .put("http://localhost:5000/blog/" + location.state.data._id, {
            title: blogTitle,
            category: blogCategory,
            description: blog,
            imageUrl: location.state.data.imageUrl,
          })
          .then((res) => {
            console.log(res.data);
            navigate("/admin/dashboard/blog");
          })
          .catch((err) => {
            console.log("Error>>: ", err);
          });
      }
    }
  };

  return (
    <div className="add-blog">
      <h2>Add New Blog</h2>
      <form onSubmit={handleSubmitBtn}>
        <input
          value={blogTitle}
          type="text"
          placeholder="Add Title"
          onChange={(e) => {
            setBlogTitle(e.target.value);
          }}
        />
        <ReactQuill
          onChange={handleBlogEditor}
          value={blog}
          placeholder="Write Blog..."
          className="quill-editor"
        />
        <select
          value={blogCategory}
          onChange={(e) => setBlogCategory(e.target.value)}
          className="select-category"
        >
          <option>Select Category</option>
          {categoryLists.map((category) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="file"
          onChange={(e) => {
            handleFileUpload(e);
          }}
        />
        {imageUrl !== null && <img src={imageUrl} alt="blog" />}
        <button className="add-submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
