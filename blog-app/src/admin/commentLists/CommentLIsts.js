import axios from "axios";
import React, { useEffect, useState } from "react";
import { deleteObject, getStorage, ref as storageRef } from "firebase/storage";
import { app } from "../../firebase";
import "./comment.css";

const CommentLists = () => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments();
  }, []);

  const getComments = () => {
    axios
      .get("http://localhost:5000/comment")
      .then((response) => {
        console.log(response.data.comment);
        setComments(response.data.comment);
      })
      .catch((error) => {
        console.log("Error::", error);
      });
  };

  const handleDeleteComment = (commentId) => {
    if (window.confirm(`Are you confirm to delete "${commentId._id}" ?`)) {
      axios
        .delete("http://localhost:5000/comment/" + commentId)
        .then((response) => {
          console.log(response);
          getComments();
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    }
  };

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Comment Lists</h2>
      <div className="comment-container">
        {comments.map((comment) => (
          <div key={comment._id} className="comment-card">
            <div className="comment-id">
              <h4>ID: {comment.email}</h4>
              <button onClick={() => handleDeleteComment(comment._id)}>🗑️</button>
            </div>
            <p>Comment: {comment.commentText}</p>
            <p>Time: {comment.timestamp}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default CommentLists;
