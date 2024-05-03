import axios from "axios";
import React, { useEffect, useState } from "react";
import { deleteObject, getStorage, ref as storageRef } from "firebase/storage";
import { app } from "../../firebase";
import { useNavigate } from "react-router-dom";
import "./categoryLists.css";

const CategoryLists = () => {
  const [categoryLists, setCategoryLists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCategoryLists();
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

  const handleUpdateCategory = (category) => {
    navigate("/admin/dashboard/update-category", {state: {data: category}});
  };

  const handleDeleteCategory = (category) => {
    if (window.confirm(`Are you confirm to delete "${category.name}" ?`)) {
      const storage = getStorage(app);
      const myRef = storageRef(storage, `${category.imageUrl}`);
      deleteObject(myRef)
        .then((result) => {
          axios
            .delete("http://localhost:5000/category/" + category._id)
            .then((response) => {
              console.log(response);
              getCategoryLists();
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
      <h2 className="category-header">Category Lists</h2>
      <div className="category-lists">
        {categoryLists.map((category) => (
          <div className="card-lists" key={category._id}>
            <h3>{category.name}</h3>
            <img src={category.imageUrl} alt="Category" width={300} />
            <button onClick={() => handleUpdateCategory(category)}>Update</button>{" "}
            <button onClick={() => handleDeleteCategory(category)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default CategoryLists;
