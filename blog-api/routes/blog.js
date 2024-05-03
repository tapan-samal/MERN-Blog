const express = require("express");
const router = express.Router();
const Blog = require("../models/blogModel");
const { default: mongoose } = require("mongoose");
const checkAdmin = require("../middleware/checkAdmin");
const { response } = require("../app");
//checkAuth working in postman but not in UI.

//post blog by admin
router.post("/", (req, res) => {
  const newBlog = new Blog({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    category: req.body.category,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
  });
  newBlog
    .save()
    .then((result) => {
      res.status(200).json({ new_blog: result });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error });
    });
});

//get all blogs
router.get("/", (req, res) => {
  Blog.find()
    .select("_id title category description imageUrl")
    .then((result) => {
      res.status(200).json({ blog: result });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error });
    });
});

//get single blog by id
router.get("/:id", (req, res) => {
  Blog.find({ _id: req.params.id })
    .select("_id title category description imageUrl")
    .then((result) => {
      res.status(200).json({ blog: result });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error });
    });
});

//get blog by category
router.get("/category/:category", (req, res) => {
  Blog.find({ category: req.params.category })
    .select("_id title category description imageUrl")
    .then((result) => {
      res.status(200).json({ blog: result });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error });
    });
});

//get latest blogs with number
router.get("/latest/:n", (req, res) => {
  Blog.find()
    .sort({ $natural: -1 })
    .limit(req.params.n)
    .then((response) => {
      res.status(200).json({ Blog: response });
    })
    .catch((error) => {
      console.log("Error: ", error);
      res.status(500).json({ Error: error });
    });
});

//update blog by id
router.put("/:id", (req, res) => {
  Blog.updateOne({ _id: req.params.id }, req.body)
    .then((result) => {
      res.status(200).json({ updatedData: result });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error });
    });
});

//delete blog by id
router.delete("/:id", (req, res) => {
  Blog.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({ deletedData: result });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error });
    });
});

//count all blog
router.get("/get/count", (req, res) => {
  Blog.find()
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
