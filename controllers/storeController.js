const Home = require("../models/home");
const User = require("../models/User.js");

exports.getIndex = (req, res, next) => {
  console.log("session value : ", req.session);
  Home.find()
    .then((registeredHomes) => {
      res.render("store/index", {
        registerHome: registeredHomes,
        PageTitle: "airbnb Home",
        currentPage: "index",
        isLoggedIn: req.session.isLoggedIn || false,
        user: req.session.user,
      });
    })
    .catch((error) => {
      console.error("Error fetching homes:", error);
      next(error);
    });
};

exports.getHomes = (req, res, next) => {
  Home.find()
    .then((registeredHomes) => {
      res.render("store/home-list", {
        registerHome: registeredHomes,
        PageTitle: "Homes List",
        currentPage: "Home",
        isLoggedIn: req.session.isLoggedIn || false,
        user: req.session.user,
      });
    })
    .catch((error) => {
      console.error("Error fetching homes:", error);
      next(error);
    });
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    PageTitle: "My Bookings",
    currentPage: "bookings",
    isLoggedIn: req.session.isLoggedIn || false,
    user: req.session.user,
  });
};

exports.getFavouriteList = async (req, res, next) => {
  const userId = req.session.user._id;
  const user = await User.findById(userId).populate("favouriteHomes");

  res.render("store/favourite-list", {
    favouriteHomes: user.favouriteHomes,
    PageTitle: "My Favourites",
    currentPage: "Favourite",
    isLoggedIn: req.session.isLoggedIn || false,
    user: req.session.user,
  });
};

exports.postAddToFavourite = async (req, res, next) => {
  const homeId = req.body.id;
  const userId = req.session.user._id;
  const user = await User.findById(userId);

  if (!user.favouriteHomes.includes(homeId)) {
    user.favouriteHomes.push(homeId);
    await user.save();
  }
  res.redirect("/favourites");
};

exports.postRemoveFromFavourite = async (req, res, next) => {
  const homeId = req.params.homeId;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if (user.favouriteHomes.includes(homeId)) {
    user.favouriteHomes = user.favouriteHomes.filter((fav) => fav != homeId);
    await user.save();
  }

  res.redirect("/favourites");
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;

  Home.findById(homeId)
    .then((home) => {
      if (!home) {
        console.log("Home not found");
        return res.redirect("/homes");
      }
      res.render("store/home-details", {
        home: home,
        PageTitle: "Home Detail",
        currentPage: "Home",
        isLoggedIn: req.session.isLoggedIn || false,
        user: req.session.user,
      });
    })
    .catch((error) => {
      console.error("Error fetching home details:", error);
      next(error);
    });
};
