const Home = require("../models/home");
exports.getAddHome = (req, res, next) => {
  res.render("host/edit-addhome", {
    PageTitle: "Add Home to Airbnb",
    currentPage: "Add Home",
    editing: false,
  });
};

// edit home
exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  Home.findById(homeId, (home) => {
    if (!home) {
      console.log("home not found for editing ");
      return res.redirect("/host/host-home-list");
    }
    console.log(homeId, editing);
    res.render("host/edit-addhome", {
      home: home,
      PageTitle: "Edit Home",
      currentPage: "Edit Home",
      editing: editing,
    });
  });
};

// post edit home
exports.postEditHome = (req, res, next) => {
  const { homeId, homeName, price, location, rating, photo } = req.body;
  const home = new Home(homeName, price, location, rating, photo);
  home.id = homeId;
  home.save();

  res.redirect("/host/host-home-list");
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
//post  req for addhome
exports.postAddHome = (req, res, next) => {
  const { homeName, price, location, rating, photo } = req.body;
  const home = new Home(homeName, price, location, rating, photo);
  home.save();

  res.render("host/home-added", {
    PageTitle: "Home Added Successfully",
    currentPage: "Home Added ",
  });
};
//post  delete home
exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("came to delet", homeId);
  Home.deletById(homeId, (error) => {
    if (error) {
      console.log("error while deleting", error);
    }
    res.redirect("/host/host-home-list");
  });
};

//3  error in app.js

exports.addError = (req, res, next) => {
  res
    .status(404)
    .render("error", { PageTitle: "Page Not Found", currentPage: "404" });
};
