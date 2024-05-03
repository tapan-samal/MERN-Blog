const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const User = require("../models/userModel");

//user signup
router.post("/signup", (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: err });
    } else {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        fullName: req.body.fullName,
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then((result) => {
          res.status(200).json({ newUser: result });
        })
        .catch((error) => {
          res.status(500).json({ error: error });
        });
    }
  });
});

//user login
router.post("/login", (req, res) => {
  User.find({ email: req.body.email })
    .then((user) => {
      console.log(user);
      if (user.length < 1) {
        return res.status(404).json({ msg: "User not found" }); //something wrong
      }
      bcrypt.compare(req.body.password, user[0].password, (error, result) => {
        if (!result) {
          return res.status(401).json({ msg: "Password matching fail" });
        }
        const token = jwt.sign(
          {
            email: user[0].email,
            fullName: user[0].fullName,
            userType: "user"
          },
          "tapan12345",
          { expiresIn: "30m" }
        );
        res
          .status(200)
          .json({ email: user[0].email, fullName: user[0].fullName, token });
      });
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
});

//Admin Login
router.post("/admin/login", (req, res) => {
  if (req.body.username === "tapan@123" && req.body.password === "12345") {
    const token = jwt.sign(
      {
        email: "tapan@gamil.com",
        fullName: "tapan samal",
        userType: "admin"
      },
      "tapan12345",
      { expiresIn: "600m" }
    );
    return res.status(200).json({
      fullName: "tapan samal",
      email: "tapan@gamil.com",
      token: token,
    });
  }
  res.status(404).json({
    msg: "bad request",
  });
});

module.exports = router;

