const Home = require("../models/home");

exports.getAddHome = (req, res) => {
  res.render("host/edit-addhome", {
<<<<<<< HEAD
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
=======
    PageTitle: "Add Home to Airbnb",
    currentPage: "Add Home",
    editing: false,
    isLoggedIn: req.isLoggedIn,
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  Home.findById(homeId)
    .then((home) => {
      if (!home) {
        console.log("Home not found for editing");
        return res.redirect("/host/host-home-list");
      }

      res.render("host/edit-addhome", {
        home,
        PageTitle: "Edit Home",
        currentPage: "Edit Home",
        editing,
        isLoggedIn: req.isLoggedIn,
      });
    })
    .catch((error) => {
      console.error("Error while fetching home for edit:", error);
      next(error);
>>>>>>> 4efd59f ( ch18 cookis and session)
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

<<<<<<< HEAD
exports.postAddHome = async (req, res, next) => {
  try {
    const { homeName, price, location, rating, photo, description } = req.body;
    await new Home(homeName, price, location, rating, photo, description).save();
    res.render("host/home-added", {
      PageTitle: "Home Added Successfully", currentPage: "Home Added",
=======
exports.getHostHomes = (req, res, next) => {
  Home.find()
    .then((registerHome) => {
      res.render("host/host-home-list", {
        registerHome,
        PageTitle: "Host Homes List",
        currentPage: "host-homes",
        isLoggedIn: req.isLoggedIn,
      });
    })
    .catch((error) => {
      console.error("Error while fetching host homes:", error);
      next(error);
>>>>>>> 4efd59f ( ch18 cookis and session)
    });
  } catch (error) { next(error); }
};

<<<<<<< HEAD
exports.postDeleteHome = async (req, res, next) => {
  try {
    await Home.deleteById(req.params.homeId);
    res.redirect("/host/host-home-list");
  } catch (error) { next(error); }
=======
exports.postAddHome = (req, res, next) => {
  const { homeName, price, location, rating, photo, description } = req.body;

  const home = new Home({
    homeName,
    price,
    location,
    rating,
    photo,
    description,
  });

  home
    .save()
    .then(() => {
      res.render("host/home-added", {
        PageTitle: "Home Added Successfully",
        currentPage: "Home Added",
        isLoggedIn: req.isLoggedIn,
      });
    })
    .catch((error) => {
      console.error("Error while saving home:", error);
      next(error);
    });
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;

  Home.findByIdAndDelete(homeId)
    .then(() => {
      res.redirect("/host/host-home-list");
    })
    .catch((error) => {
      console.error("Error while deleting home:", error);
      next(error);
    });
};

exports.addError = (req, res, next) => {
  res.status(404).render("error", {
    PageTitle: "Page Not Found",
    currentPage: "404",
    isLoggedIn: req.isLoggedIn,
  });
>>>>>>> 4efd59f ( ch18 cookis and session)
};
