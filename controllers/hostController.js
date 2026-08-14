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

  Home.findById(homeId)
    .then((home) => {
      if (!home) {
        console.log("home not found for editing");
        return res.redirect("/host/host-home-list");
      }
      console.log(homeId, editing);
      res.render("host/edit-addhome", {
        home: home,
        PageTitle: "Edit Home",
        currentPage: "Edit Home",
        editing: editing,
      });
    })
    .catch((error) => {
      console.log("Error while fetching home for edit page", error);
      next(error);
    });
};

// post edit home
exports.postEditHome = (req, res, next) => {
  const { homeId, homeName, price, location, rating, photo, description } =
    req.body;
  Home.findById(homeId)
    .then((home) => {
      if (!home) {
        console.log("Home not found");
        return res.redirect("/host/host-home-list");
      }
      // find the home by id and update the fields
      home.homeName = homeName;
      home.price = price;
      home.location = location;
      home.rating = rating;
      home.photo = photo;
      home.description = description;
      home
        .save()
        .then((result) => {
          console.log("Home updated successfully");
          res.redirect("/host/host-home-list");
        })
        .catch((error) => {
          console.log("Error while updating home", error);
          next(error);
        });
    })
    .catch((error) => {
      console.log("Error while fetching home for editing", error);
      next(error);
    });
};

exports.getHostHomes = (req, res, next) => {
  Home.find()
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
  const home = new Home({
    homeName,
    price,
    location,
    rating,
    photo,
    description,
  }); // inside in bracket  already we have object so we can pass it directly to the constructor

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
  Home.findByIdAndDelete(homeId)
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
