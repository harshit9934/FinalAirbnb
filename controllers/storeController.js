const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  Home.fetchAll((registerHome) => {
    res.render("store/index", {
      registerHome,
      PageTitle: "airbnb Home",
      currentPage: "index",
    });
  }); // call fetchall at home
};

//2  userRouter mai phele middleware ka function
exports.getHomes = (req, res, next) => {
  Home.fetchAll((registerHome) => {
    res.render("store/home-list", {
      registerHome,
      PageTitle: " Homes List",
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
exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    PageTitle: "My Bookings",
    currentPage: "bookings",
  });
};

exports.getFavouriteList = (req, res, next) => {
  Home.fetchAll((registerHome) => {
    res.render("store/favourite-list", {
      registerHome,
      PageTitle: " My Favourites",
      currentPage: "Favourites",
    });
  });
};
