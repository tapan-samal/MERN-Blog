const express = require("express");
const bodyParser = require("body-parser");
const { urlencoded, json } = require("body-parser");
const connectDb = require("./config/dbConnection");
const blogRoute = require("./routes/blog");
const categoryRoute = require("./routes/category");
const userRoute = require("./routes/user");
const commentRoute = require("./routes/comment");
const cors = require("cors");

connectDb();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/blog", blogRoute);
app.use("/category", categoryRoute);
app.use("/user", userRoute);
app.use("/comment", commentRoute);

app.use((req, res) => {
  res.status(200).json({ msg: "Check, something done wrong" });
});

module.exports = app;
