const User = require("../../models/User");

const Utils = {
  //Get Current User if is valid and set it in :
  //  ^res.locals.user
  getUser: async (req, res, next) => {
    if (req.cookies["AuthUsername"]) {
      //He is Logged Before!
      const user = await User.findOne({
        Username: req.cookies["AuthUsername"],
      });
      if (user.AccessToken == req.cookies["AuthAccessToken"])
        res.locals.user = user;
    }
    next();
  },
  //Check if user has Authenticated
  checkAuth: async (req, res, next) => {
    if (req.cookies["AuthUsername"]) {
      //He is Logged Before!
      const user = await User.findOne({
        Username: req.cookies["AuthUsername"],
      });
      if (user.AccessToken == req.cookies["AuthAccessToken"]) {
        res.locals.user = user;
        next();
      } else res.redirect("/login");
    } else {
      //new Login
      res.redirect("/login");
    }
  },
  //check if user is not Authenticated!
  checkNotAuth: async (req, res, next) => {
    if (req.cookies["AuthUsername"]) {
      //He is Logged Before!
      const user = await User.findOne({
        Username: req.cookies["AuthUsername"],
      });
      if (user.AccessToken == req.cookies["AuthAccessToken"]) {
        res.locals.user = user;
        res.redirect("/");
      } else next();
    }
    //new Login
    else next();
  },
};
module.exports = Utils;
