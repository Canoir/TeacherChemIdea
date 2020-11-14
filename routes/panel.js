const express = require("express");
const { checkAuth, Roles } = require("./Utils/utils");
const panelRoute = express.Router();

//The GET Method of Main Panel Page!
panelRoute.get("/", checkAuth, (req, res) => {
  switch (res.locals.user.RoleId) {
    case Roles.Teacher:
      res.render("Areas/Teacher/index", { title: "داشبورد" });
      break;
    case Roles.God:
      break;
    case Roles.Student:
      res.render("Areas/Student/index");
      break;
  }
});
//The GET Method of Exams Page!
panelRoute.get("/exams", checkAuth, (req, res) => {
  switch (res.locals.user.RoleId) {
    case Roles.Teacher:
      res.render("Areas/Teacher/exams", { title: "مدیریت آزمون ها" });
      break;
    case Roles.God:
      break;
    case Roles.Student:
      res.render("Areas/Student/index");
      break;
  }
});

module.exports = panelRoute;
