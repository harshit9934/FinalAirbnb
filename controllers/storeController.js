const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  Home.fetchAll()
    .then((registerHome) => {
      res.render("store/index", {
        registerHome: registerHome,
        PageTitle: "airbnb Home",
        currentPage: "index",
      });
    })
    .catch((error) => {
      console.log("Error while fetching homes for index", error);
      next(error);
    });
};

//2  userRouter mai phele middleware ka function
exports.getHomes = (req, res, next) => {
  Home.fetchAll()
    .then((registerHome) => {
      res.render("store/home-list", {
        registerHome,
        PageTitle: " Homes List",
        currentPage: "Home",
      });
    })
    .catch((error) => {
      console.log("Error while fetching homes", error);
      next(error);
    });
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
  Favourite.fetchAll()
    .then((favourites) => {
      const favouriteIds = favourites.map((fav) => fav.homeId);
      return Home.fetchAll().then((registerHome) => {
        const favouriteHomes = registerHome.filter((home) =>
          favouriteIds.includes(home.id.toString()),
        );
        res.render("store/favourite-list", {
          registerHome: favouriteHomes,
          PageTitle: " My Favourites",
          currentPage: "Favourites",
        });
      });
    })
    .catch((error) => {
      console.log("Error while fetching favourites", error);
      next(error);
    });
};
//  add fav
exports.postAddFavourites = (req, res, next) => {
  const homeId = req.body.id;
  const fav = new Favourite(homeId);
  fav
    .save()
    .then((result) => {
      console.log("fav added", result);
      res.redirect("/favourites");
    })
    .catch((error) => {
      console.log("Error while adding favourite", error);
      next(error);
    });
};

// remove from favourite
exports.postRemoveFavourites = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.deleteById(homeId)
    .then((result) => {
      console.log("fav removed", result);
      res.redirect("/favourites");
    })
    .catch((error) => {
      console.log("Error while removing favourite", error);
      next(error);
    });
};

exports.getHomesDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log(" At home detail page", homeId);
  Home.findById(homeId).then((home) => {
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
