const mongoose = require("mongoose");

blogSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  description: String,
  imageUrl: String,
  category: String
});

module.exports = mongoose.model("Blog", blogSchema);
