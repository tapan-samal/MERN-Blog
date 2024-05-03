const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Comment = require("../models/commentModel");
const checkAuth = require("../middleware/checkUser");

//post new comment
router.post("/", (req, res) => {
  const newComment = new Comment({
    _id: new mongoose.Types.ObjectId(),
    email: req.body.email,
    commentText: req.body.commentText,
    blogId: req.body.blogId,
  });
  newComment
    .save()
    .then((result) => {
      res.status(200).json({ new_comment: result });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error });
    });
});

//get all comments
router.get("/", (req, res) => {
  Comment.find()
    .select("_id email commentText blogId timestamp")
    .then((result) => {
      res.status(200).json({ comment: result });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error });
    });
});

//delete comment by id
router.delete("/:id", (req, res) => {
  Comment.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({ deletedData: result });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error });
    });
});

//count all comment by blog
router.get("/count/:blogId", (req, res) => {
  Comment.find({ blogId: req.params.blogId })
    .countDocuments()
    .then((result) => {
      res.status(200).json({ total: result });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error });
    });
});

module.exports = router;
