const Home = require("../models/home");
exports.getAddHome = (req, res, next) => {
  res.render("addhome", {
    PageTitle: "Add Home to Airbnb",
    currentPage: "Add Home",
  });
};

//post
exports.postAddHome = (req, res, next) => {
  const { homeName, price, location, rating, photo } = req.body;
  const home = new Home(homeName, price, location, rating, photo);
  home.save();

  res.render("homeadded", {
    PageTitle: "Home Added Successfully",
    currentPage: "Home Added ",
  });
};

//2  userRouter mai phele middleware ka function
exports.getHomes = (req, res, next) => {
  Home.fetchAll((registerHome) => {
    res.render("Home", {
      registerHome,
      PageTitle: "airbnb Home",
      currentPage: "Home",
    });
  }); // call fetchall at home
};

//3  error in app.js

exports.addError = (req, res, next) => {
  res
    .status(404)
    .render("error", { PageTitle: "Page Not Found", currentPage: "404" });
};
