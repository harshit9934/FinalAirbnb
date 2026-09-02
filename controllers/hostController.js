const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-addhome", {
    PageTitle: "Add Home to Airbnb",
    currentPage: "Add Home",
    editing: false,
    isLoggedIn: req.session.isLoggedIn || false,
    user: req.session.user,
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
        isLoggedIn: req.session.isLoggedIn || false,
        user: req.session.user,
      });
    })
    .catch((error) => {
      console.error("Error while fetching home for edit:", error);
      next(error);
    });
};

exports.postEditHome = (req, res, next) => {
  const { homeId, homeName, price, location, rating, description } = req.body;
  const photo = req.files?.photo?.[0];
  const rules = req.files?.rules?.[0];
  Home.findByIdAndUpdate(
    homeId,
    {
      homeName,
      price,
      location,
      rating,
      description,
      ...(photo && { photo: `/uploads/${photo.filename}` }),
      ...(rules && { rules: `/rules/${rules.filename}` }),
    },
    { returnDocument: "after" },
  )

    .then(() => {
      res.redirect("/host/host-home-list");
    })
    .catch((error) => {
      console.error("Error while updating home:", error);
      next(error);
    });
};

exports.getHostHomes = (req, res, next) => {
  Home.find()
    .then((registerHome) => {
      res.render("host/host-home-list", {
        registerHome,
        PageTitle: "Host Homes List",
        currentPage: "host-homes",
        isLoggedIn: req.session.isLoggedIn || false,
        user: req.session.user,
      });
    })
    .catch((error) => {
      console.error("Error while fetching host homes:", error);
      next(error);
    });
};

exports.postAddHome = (req, res, next) => {
  const { homeName, price, location, rating, description } = req.body;
  const photo = req.files?.photo?.[0];
  const rules = req.files?.rules?.[0];
  if (!photo) {
    return res.status(400).send("No file uploaded.");
  }
  const home = new Home({
    homeName,
    price,
    location,
    rating,
    photo: `/uploads/${photo.filename}`,
    rules: rules ? `/rules/${rules.filename}` : "",
    description,
  });

  home
    .save()
    .then(() => {
      res.render("host/home-added", {
        PageTitle: "Home Added Successfully",
        currentPage: "Home Added",
        isLoggedIn: req.session.isLoggedIn || false,
        user: req.session.user,
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
    isLoggedIn: req.session.isLoggedIn || false,
    user: req.session.user,
  });
};
