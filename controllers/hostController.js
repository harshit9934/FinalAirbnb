const Home = require("../models/home");
exports.getAddHome = (req, res, next) => {
  res.render("host/addhome", {
    PageTitle: "Add Home to Airbnb",
    currentPage: "Add Home",
  });
};

exports.getHostHomes = (req, res, next) => {
  Home.fetchAll((registerHome) => {
    res.render("host/host-home-list", {
      registerHome,
      PageTitle: " Host Homes List",
      currentPage: "Host-Homes",
    });
  });
};
//post
exports.postAddHome = (req, res, next) => {
  const { homeName, price, location, rating, photo } = req.body;
  const home = new Home(homeName, price, location, rating, photo);
  home.save();

  res.render("host/home-added", {
    PageTitle: "Home Added Successfully",
    currentPage: "Home Added ",
  });
};

//3  error in app.js

exports.addError = (req, res, next) => {
  res
    .status(404)
    .render("error", { PageTitle: "Page Not Found", currentPage: "404" });
};
