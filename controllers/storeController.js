const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  Home.find()
    .then((registeredHomes) => {
      res.render("store/index", {
        registerHome: registeredHomes,
        PageTitle: "airbnb Home",
        currentPage: "index",
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
  });
};

exports.getFavouriteList = (req, res, next) => {
  Favourite.find()
    .populate("homeId")
    .then((favourites) => {
      // Extract the populated home objects and filter out null/undefined
      const favouriteHomes = favourites
        .map((fav) => fav.homeId)
        .filter((home) => home); // Filters out null, undefined, and other falsy values

      console.log(
        `✅ Rendering ${favouriteHomes.length} valid favourite home(s)`,
      );

      res.render("store/favourite-list", {
        registerHome: favouriteHomes,
        PageTitle: "My Favourites",
        currentPage: "Favourite",
      });
    })
    .catch((error) => {
      console.error("Error fetching favourites:", error);
      next(error);
    });
};

exports.postAddToFavourite = (req, res, next) => {
  const homeId = req.body.id;

  const favourite = new Favourite({ homeId });

  favourite
    .save()
    .then((result) => {
      console.log("✅ Favourite added:", result);
    })
    .catch((err) => {
      console.error("❌ Error while marking favourite:", err);
    })
    .finally(() => {
      res.redirect("/favourites");
    });
};

exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;

  Favourite.findOneAndDelete({ homeId })
    .then((result) => {
      console.log("✅ Favourite Removed:", result);
    })
    .catch((err) => {
      console.error("❌ Error while removing favourite:", err);
    })
    .finally(() => {
      res.redirect("/favourites");
    });
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
      });
    })
    .catch((error) => {
      console.error("Error fetching home details:", error);
      next(error);
    });
};
