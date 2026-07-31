const Favourite = require("../models/favourite");
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
  Favourite.getFavourite((favouriteIds) => {
    Home.fetchAll((registerHome) => {
      const favouriteHomes = registerHome.filter((home) =>
        favouriteIds.includes(home.id),
      );
      res.render("store/favourite-list", {
        registerHome: favouriteHomes,
        PageTitle: " My Favourites",
        currentPage: "Favourites",
      });
    });
  });
};
//  add fav
exports.postAddToFavourite = (req, res, next) => {
  console.log("came to add to favourites", req.body);
  Favourite.addTofavourite(req.body.id, (error) => {
    if (error) {
      console.log("Error while marking favourites");
    }
    res.redirect("/favourites");
  });
};

// remove from favourite
exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.deletById(homeId, (error) => {
    if (error) {
      console.log("Error while removing from favourite ", error);
    }
    res.redirect("/favourites");
  });
};

exports.getHomesDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log(" At home detail page", homeId);
  Home.findById(homeId, (home) => {
    console.log("Found home:", home);
    if (!home) {
      console.log("Home not found for ID:", homeId);
    }
    res.render("store/home-details", {
      home,
      PageTitle: "Home Detail",
      currentPage: "Home",
    });
  });
};
