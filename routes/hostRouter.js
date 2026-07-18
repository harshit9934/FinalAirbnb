// core modules
const path = require("path");

// external modules
const express = require("express");

const hostRouter = express.Router();
// import pathUtils from utils folder
const rootDir = require("../utils/pathUtils.js");

hostRouter.get("/add-home", (req, res, next) => {
  res.render("addhome", { PageTitle: "Add Home to Airbnb" , currentPage :'Add Home'});
}); // for  add home

// midddleware that colect data and give success

const registerHome = [];
hostRouter.post("/add-home", (req, res, next) => {
  console.log(
    "Home Registration Successful  for :",
    req.body,
    req.body.homeName,
  );

  registerHome.push({
    homeName: req.body.homeName,
    price: req.body.price,
    location: req.body.location,
    rating: req.body.rating,
    photo: req.body.photo || ''
  }); // for push
  res.render("homeadded", { PageTitle: "Home Added Successfully", currentPage :'Home Added '});
});

exports.hostRouter = hostRouter;
exports.registerHome = registerHome;
