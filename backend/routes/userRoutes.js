const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");
const isAdmin = require("../middlewares/isAdmin");
const {
  validator,
  logInRules,
  userRegisterRules,
} = require("../middlewares/validator");

router.get("/test", (req, res) => {
  res.send("router user test");
});

// user sign up

router.post("/signup", userRegisterRules(), validator, async (req, res) => {
  const { email, password, role } = req.body;
  try {
    if (role == "admin" || role == "superAdmin") {
      return res.status(401).send({ msg: "unauthorized" });
    }
    const searchedUser = await User.findOne({ email });
    if (searchedUser) {
      return res.status(400).send({ msg: "user already exist" });
    }
    const newUser = new User(req.body);
    const hashedPassword = await bcrypt.hash(password, 10);
    newUser.password = hashedPassword;
    await newUser.save();
    res.send({ msg: "user added successfully" });
  } catch (error) {
    console.log(error);
    res.end();
  }
});

// log in

router.post("/login", logInRules(), validator, async (req, res) => {
  const { email, password } = req.body;
  try {
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(400).send({ msg: "incorrect email or password" });
    }
    const match = await bcrypt.compare(password, existUser.password);
    if (!match) {
      return res.status(400).send({ msg: "incorrect email or password" });
    }
    if (existUser.isBanned) {
      res.status(400).send({ msg: "user banned" });
    }
    existUser.password = undefined;
    const payload = { _id: existUser._id };
    const token = jwt.sign(payload, process.env.PRIVATEKEY);
    res.send({ user: existUser, token });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

//get current user

router.get("/current", isAuth(), async (req, res) => {
  res.send({ user: req.user });
});

//get all workers

router.get("/allworkers", async (req, res) => {
  try {
    const allworkers = await User.find({ role: "worker" });
    res.send(allworkers);
  } catch (error) {
    console.log("error");
    res.status(400).send({ msg: error });
  }
});

//get all users

router.get("/allusers", isAuth(), isAdmin, async (req, res) => {
  try {
    const users = await User.find().select(
      "_id firstName lastName email role isBanned "
    );
    res.send(users);
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});

// delete user

module.exports = router;
