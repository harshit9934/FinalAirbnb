const Home = require("../models/home");

exports.getAddHome = (req, res) => {
  res.render("host/edit-addhome", {
    PageTitle: "Add Home to Airbnb", currentPage: "Add Home", editing: false,
  });
};

exports.getEditHome = async (req, res, next) => {
  try {
    const [homes] = await Home.findById(req.params.homeId);
    const home = homes[0];
    if (!home) return res.redirect("/host/host-home-list");
    res.render("host/edit-addhome", {
      home, PageTitle: "Edit Home", currentPage: "Edit Home",
      editing: req.query.editing === "true",
    });
  } catch (error) { next(error); }
};

exports.postEditHome = async (req, res, next) => {
  try {
    const { homeId, homeName, price, location, rating, photo, description } = req.body;
    await new Home(homeName, price, location, rating, photo, description, homeId).save();
    res.redirect("/host/host-home-list");
  } catch (error) { next(error); }
};

exports.getHostHomes = async (req, res, next) => {
  try {
    const [registeredHomes] = await Home.fetchAll();
    res.render("host/host-home-list", {
      registeredHomes, PageTitle: "Host Homes List", currentPage: "host-homes",
    });
  } catch (error) { next(error); }
};

exports.postAddHome = async (req, res, next) => {
  try {
    const { homeName, price, location, rating, photo, description } = req.body;
    await new Home(homeName, price, location, rating, photo, description).save();
    res.render("host/home-added", {
      PageTitle: "Home Added Successfully", currentPage: "Home Added",
    });
  } catch (error) { next(error); }
};

exports.postDeleteHome = async (req, res, next) => {
  try {
    await Home.deleteById(req.params.homeId);
    res.redirect("/host/host-home-list");
  } catch (error) { next(error); }
};
