const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Category = require("../models/categoryModel");

//post category by admin
router.post("/", (req, res) => {
  const newCategory = new Category({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    imageUrl: req.body.imageUrl,
  });
  newCategory
    .save()
    .then((result) => {
      res.status(200).json({ new_category: result });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error });
    });
});

//get all categories
router.get("/", (req, res) => {
  Category.find()
    .select("_id name imageUrl")
    .then((result) => {
      res.status(200).json({ category: result });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error });
    });
});

//get latest categories with number
router.get("/latest/:n", (req, res) => {
  Category.find()
    .sort({ $natural: -1 })
    .limit(req.params.n)
    .then((response) => {
      res.status(200).json({ Category: response });
    })
    .catch((error) => {
      console.log("Error: ", error);
      res.status(500).json({ Error: error });
    });
});

//update category by id
router.put("/:id", (req, res) => {
  Category.updateOne({ _id: req.params.id }, req.body)
    .then((result) => {
      res.status(200).json({ updatedData: result });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error });
    });
});

//delete category by id
router.delete("/:id", (req, res) => {
  Category.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({ deletedData: result });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error });
    });
});

//count all category
router.get("/get/count", (req, res) => {
  Category.find()
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
