const Favourite = require("../models/favourite");
const Home = require("../models/home");

// Home page
exports.getIndex = (req, res, next) => {
  Home.find()
    .then((registerHome) => {
      res.render("store/index", {
        registerHome,
        PageTitle: "airbnb Home",
        currentPage: "index",
      });
    })
    .catch((error) => {
      console.log("Error while fetching homes for index", error);
      next(error);
    });
};

// Home list
exports.getHomes = (req, res, next) => {
  Home.find()
    .then((registerHome) => {
      res.render("store/home-list", {
        registerHome,
        PageTitle: "Homes List",
        currentPage: "Home",
      });
    })
    .catch((error) => {
      console.log("Error while fetching homes", error);
      next(error);
    });
};

// 404 error
exports.addError = (req, res, next) => {
  res.status(404).render("error", {
    PageTitle: "Page Not Found",
    currentPage: "404",
  });
};

// Bookings
exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    PageTitle: "My Bookings",
    currentPage: "bookings",
  });
};

// Get all favorite homes
exports.getFavouriteList = (req, res, next) => {
  Favourite.find()
    .populate("homeId")
    .sort({ createdAt: -1 })
    .then((favourites) => {
      console.log(`✅ Found ${favourites.length} favorite(s)`);

      const favouriteHomes = favourites
        .map((fav) => fav.homeId)
        .filter((home) => home !== null);

      res.render("store/favourite-list", {
        registerHome: favouriteHomes,
        PageTitle: "My Favourites",
        currentPage: "Favourites",
      });
    })
    .catch((error) => {
      console.error("❌ Error while fetching favourites:", error.message);
      next(error);
    });
};

// Add a home to favorites
exports.postAddFavourites = (req, res, next) => {
  const homeId = req.body.id;

  if (!homeId) {
    console.error("❌ Home ID not provided");
    return res.status(400).redirect("/homes");
  }

  Home.findById(homeId)
    .then((home) => {
      if (!home) {
        console.error("❌ Home not found for ID:", homeId);
        return res.status(404).redirect("/homes");
      }

      return Favourite.findOne({ homeId: homeId }).then((existingFav) => {
        if (existingFav) {
          console.log("⚠️ Home already in favorites:", homeId);
          return res.redirect("/favourites");
        }

        const newFav = new Favourite({
          homeId: homeId,
        });

        return newFav.save().then((result) => {
          console.log("✅ Favorite added successfully:", result._id);
          res.redirect("/favourites");
        });
      });
    })
    .catch((error) => {
      console.error("❌ Error while adding favourite:", error.message);
      next(error);
    });
};

// Remove a home from favorites
exports.postRemoveFavourites = (req, res, next) => {
  const homeId = req.params.homeId;

  if (!homeId) {
    console.error("❌ Home ID not provided for removal");
    return res.status(400).redirect("/favourites");
  }

  Favourite.findOneAndDelete({ homeId: homeId })
    .then((result) => {
      if (result) {
        console.log("✅ Favorite removed successfully:", result._id);
      } else {
        console.warn("⚠️ Favorite not found for homeId:", homeId);
      }

      res.redirect("/favourites");
    })
    .catch((error) => {
      console.error("❌ Error while removing favourite:", error.message);
      next(error);
    });
};

// Home details
exports.getHomesDetails = (req, res, next) => {
  const homeId = req.params.homeId;

  console.log("At home detail page:", homeId);

  Home.findById(homeId)
    .then((home) => {
      console.log("Found home:", home);

      if (!home) {
        console.log("Home not found for ID:", homeId);

        return res.status(404).render("error", {
          PageTitle: "Home Not Found",
          currentPage: "Error",
        });
      }

      res.render("store/home-details", {
        home,
        PageTitle: "Home Detail",
        currentPage: "Home",
      });
    })
    .catch((error) => {
      console.log("Error while fetching home details", error);
      next(error);
    });
};
