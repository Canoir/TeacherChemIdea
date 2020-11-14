const express = require("express");
const User = require("../models/User");
const Utils = require("./Utils/utils");
const crypto = require("crypto");
const router = express.Router();

//Web Site Home Page
router.get("/", Utils.checkAuth, (req, res) => {
  console.log(res.locals.user);
  res.render("index", { title: "Index" });
});
//Login View Render
router.get("/login", Utils.checkNotAuth, (req, res) => {
  res.render("login", { title: "Login", message: req.query.m });
});
//Login Form Post
router.post("/login/new", Utils.checkNotAuth, async (req, res) => {
  const user = await User.findOne({ Username: req.body.Username });
  if (user) {
    if (req.body.Password == user.Password) {
      const at = await crypto.randomBytes(64).toString("base64");
      console.log(at);
      res.cookie("AuthUsername", user.Username, { maxAge: 10800000 });
      res.cookie("AuthAccessToken", at, { maxAge: 10800000 });
      await user.updateOne({ AccessToken: at });
      res.redirect("/");
    } else res.redirect(`/login?m=Password is not valid!`);
  } else res.redirect(`/login?m=Username is not valid!`);
});

module.exports = router;
