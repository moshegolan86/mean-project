const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// npm install randomstring
const randomString = require('randomstring');

const User = require("../models/user");

const router = express.Router();

// for email verfication
const secretToken = randomString.generate();

router.post("/register", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      img: req.body.img,
      isAdmin: req.body.isAdmin
    });
    console.log(user);
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
});

router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id},
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        firstName: fetchedUser.firstName,
        lastName: fetchedUser.lastName,
        isAdmin: fetchedUser.isAdmin,
        img: fetchedUser.img
      });
    })
    .catch(err => {
      return res.status(401).json({
        message: "Auth failed"
      });
    });
});


router.post("/studentIdRequest", (req, res, next) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    img: req.body.img,
    isAdmin: req.body.isAdmin

  });
  console.log(req.body.email);
  User.findOneAndUpdate({ email: req.body.email }, {img: req.body.img})
  .then(result => {
    console.log(result);
    res.status(200).json({ message: "image Update successful!" });
  })
  .catch(err => {
    return res.status(401).json({
      message: "setting image failed"
    });
  });
});

module.exports = router;
