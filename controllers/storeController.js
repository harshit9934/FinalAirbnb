const Favourite = require("../models/favourite");
const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  Home.fetchAll((registerHome) => {
    res.render("store/index", {
      registerHome,
      PageTitle: "airbnb Home",
      currentPage: "index",
    });
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

// Get all favorite homes
exports.getFavouriteList = (req, res, next) => {
  Favourite.getFavourite((favouriteIds) => {
    Home.fetchAll((registerHome) => {
      const favouriteHomes = registerHome.filter((home) =>
        favouriteIds.includes(home.id),
      );
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
//  add fav
// Add a home to favorites
exports.postAddFavourites = (req, res, next) => {
  const homeId = req.body.id;

  // Validate homeId
  if (!homeId) {
    console.error("❌ Home ID not provided");
    return res.status(400).redirect("/homes");
  }

  // Verify home exists before adding to favorites
  Home.findById(homeId)
    .then((home) => {
      if (!home) {
        console.error("❌ Home not found for ID:", homeId);
        return res.status(404).redirect("/homes");
      }

      // Check if already favorited
      return Favourite.findOne({ homeId: homeId }).then((existingFav) => {
        if (existingFav) {
          console.log("⚠️  Home already in favorites:", homeId);
          return res.redirect("/favourites");
        }

        // Create and save new favorite
        const newFav = new Favourite({ homeId: homeId });
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

// remove from favourite
// Remove a home from favorites
exports.postRemoveFavourites = (req, res, next) => {
  const homeId = req.params.homeId;

  // Validate homeId
  if (!homeId) {
    console.error("❌ Home ID not provided for removal");
    return res.status(400).redirect("/favourites");
  }

  Favourite.findOneAndDelete({ homeId: homeId })
    .then((result) => {
      if (result) {
        console.log("✅ Favorite removed successfully", result._id);
      } else {
        console.warn("⚠️  Favorite not found for homeId:", homeId);
      }
      res.redirect("/favourites");
    })
    .catch((error) => {
      console.error("❌ Error while removing favourite:", error.message);
      next(error);
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
