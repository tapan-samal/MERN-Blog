import React, { useEffect, useState } from "react";
import "./addCategory.css";
import {
  getDownloadURL,
  getStorage,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { app } from "../../firebase";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [uploadFile, setUploadFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log(location.state);
    if (location.state !== null) {
      setCategoryName(location.state.data.name);
      setImageUrl(location.state.data.imageUrl);
    }
  }, []);

  const handleFileUpload = (e) => {
    setUploadFile(e.target.files[0]);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmitBtn = async (event) => {
    event.preventDefault();
    if (location.state === null) {
      console.log(categoryName, uploadFile);
      const storage = getStorage(app);
      const myRef = storageRef(storage, `category/${Date.now()}`);
      await uploadBytes(myRef, uploadFile);
      const uploadedImageUrl = await getDownloadURL(myRef);
      console.log(uploadedImageUrl);

      axios
        .post("http://localhost:5000/category", {
          name: categoryName,
          imageUrl: uploadedImageUrl,
        })
        .then((res) => {
          console.log(res.data);
          navigate("/admin/dashboard/category");
        })
        .catch((err) => {
          console.log("Error>>: ", err);
        });
    } else {
      if (uploadFile == null) {
        axios
          .put("http://localhost:5000/category/" + location.state.data._id, {
            name: categoryName,
            imageUrl: location.state.data.imageUrl,
          })
          .then((res) => {
            console.log(res.data);
            navigate("/admin/dashboard/category");
          })
          .catch((err) => {
            console.log("Error>>: ", err);
          });
      } else {
        console.log(categoryName, uploadFile);
        const storage = getStorage(app);
        const myRef = storageRef(storage, `${location.state.data.imageUrl}`);
        await uploadBytes(myRef, uploadFile);
        const uploadedImageUrl = await getDownloadURL(myRef);
        console.log(uploadedImageUrl);

        axios
          .put("http://localhost:5000/category/" + location.state.data._id, {
            name: categoryName,
            imageUrl: uploadedImageUrl,
          })
          .then((res) => {
            console.log(res.data);
            navigate("/admin/dashboard/category");
          })
          .catch((err) => {
            console.log("Error>>: ", err);
          });
      }
    }
  };

  return (
    <div className="add-category">
      <h2>Add Category</h2>
      <form onSubmit={handleSubmitBtn}>
        <input
          value={categoryName}
          type="text"
          placeholder="Category Name"
          onChange={(e) => {
            setCategoryName(e.target.value);
          }}
        />
        <input
          type="file"
          onChange={(e) => {
            handleFileUpload(e);
          }}
        />
        {imageUrl !== null && <img src={imageUrl} alt="category" />}
        <button className="add-submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
