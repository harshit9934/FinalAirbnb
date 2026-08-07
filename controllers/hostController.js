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

  Home.findById(homeId).then((home) => {
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
  const { homeId, homeName, price, location, rating, photo, description } =
    req.body;
  const home = new Home(homeName, price, location, rating, photo, description);
  home.id = homeId;

  Home.updateById(home)
    .then(() => {
      res.redirect("/host/host-home-list");
    })
    .catch((error) => {
      console.log("Error while saving home", error);
      next(error);
    });
};

exports.getHostHomes = (req, res, next) => {
  Home.fetchAll()
    .then((registerHome) => {
      res.render("host/host-home-list", {
        registerHome,
        PageTitle: " Host Homes List",
        currentPage: "Host-Homes",
      });
    })
    .catch((error) => {
      console.log("Error while fetching host homes", error);
      next(error);
    });
};
//post  req for addhome
exports.postAddHome = (req, res, next) => {
  const { homeName, price, location, rating, photo, description } = req.body;
  const home = new Home(homeName, price, location, rating, photo, description);

  home
    .save()
    .then(() => {
      console.log("Home added successfully");
      res.render("host/home-added", {
        PageTitle: "Home Added Successfully",
        currentPage: "Home Added ",
      });
    })
    .catch((error) => {
      console.log("Error while adding home", error);
      next(error);
    });
};
//post  delete home
exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("came to delet", homeId);
  Home.deleteById(homeId)
    .then(() => {
      res.redirect("/host/host-home-list");
    })
    .catch((error) => {
      console.log("Error while deleting ", error);
      next(error);
    });
};

//3  error in app.js

exports.addError = (req, res, next) => {
  res
    .status(404)
    .render("error", { PageTitle: "Page Not Found", currentPage: "404" });
};
