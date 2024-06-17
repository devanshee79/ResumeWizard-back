const express = require("express");
const User = require("../models/userModel");
const app = express.Router();

app.post("/login", async (req, res) => {
  try {
    const result = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });
    console.log(result)
    if (result) {
      res.send(result);
    } else {
      res.status(400).json("Login failed");
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post("/register", async (req, res) => {
  try {
    const newuser = new User(req.body);
    await newuser.save();

    res.send("Registration Successfull");
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post("/update", async (req, res) => {
  try {
    console.log(req.body);
    const result = await User.findOneAndUpdate({ _id: req.body._id }, req.body, {returnDocument: 'after'});
    res.send(result);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = app;
