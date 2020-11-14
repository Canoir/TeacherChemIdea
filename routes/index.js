const express = require("express");
const User = require("../models/User");
const { checkAuth, checkNotAuth, getUser } = require("./Utils/utils");
const { randomBytes } = require("crypto");
const router = express.Router();

//Web Site Home Page
router.get("/", getUser, (req, res) => {
  res.render("index");
});
//Login View Render
router.get("/login", checkNotAuth, (req, res) => {
  res.render("login", { title: "Login", message: req.query.m });
});
//Login Form Post
router.post("/login/new", checkNotAuth, async (req, res) => {
  const user = await User.findOne({ Username: req.body.Username });
  if (user) {
    if (req.body.Password == user.Password) {
      const at = randomBytes(64).toString("base64");
      res.cookie("AuthUsername", user.Username, { maxAge: 10800000 });
      res.cookie("AuthAccessToken", at, { maxAge: 10800000 });
      await user.updateOne({ AccessToken: at });
      res.redirect("/");
    } else res.redirect(`/login?m=Password is not valid!`);
  } else res.redirect(`/login?m=Username is not valid!`);
});
//The GET Method of SignOut Page!
router.get("/signOut", checkAuth, async (req, res) => {
  await res.locals.user.updateOne({ AccessToken: "" });
  res.redirect("/");
});

module.exports = router;
