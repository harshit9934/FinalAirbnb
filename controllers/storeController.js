const Favourite = require("../models/favourite");
const Home = require("../models/home");

<<<<<<< HEAD
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
=======
// 1. Home page
exports.getIndex = (req, res, next) => {
  Home.fetchAll((registerHome) => {
    res.render("store/index", {
      registerHome,
      PageTitle: "airbnb Home",
      currentPage: "index",
>>>>>>> 4d9e1d60236c72f46f917082e0dc05747ccf5159
    });
  });
};

<<<<<<< HEAD
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
=======
// 2. Home list
exports.getHomes = (req, res, next) => {
  Home.fetchAll((registerHome) => {
    res.render("store/home-list", {
      registerHome,
      PageTitle: "Homes List",
      currentPage: "Home",
>>>>>>> 4d9e1d60236c72f46f917082e0dc05747ccf5159
    });
  });
};

<<<<<<< HEAD
// 404 error
=======
// 3. Error page
>>>>>>> 4d9e1d60236c72f46f917082e0dc05747ccf5159
exports.addError = (req, res, next) => {
  res.status(404).render("error", {
    PageTitle: "Page Not Found",
    currentPage: "404",
  });
};

<<<<<<< HEAD
// Bookings
=======
// 4. Bookings
>>>>>>> 4d9e1d60236c72f46f917082e0dc05747ccf5159
exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    PageTitle: "My Bookings",
    currentPage: "bookings",
  });
};

// 5. Get favourite homes
exports.getFavouriteList = (req, res, next) => {
<<<<<<< HEAD
  Favourite.find()
    .populate("homeId")
    .sort({ createdAt: -1 })
    .then((favourites) => {
      console.log(`✅ Found ${favourites.length} favorite(s)`);

      const favouriteHomes = favourites
        .map((fav) => fav.homeId)
        .filter((home) => home !== null);
=======
  Favourite.getFavourite((favouriteIds) => {
    Home.fetchAll((registerHome) => {
      const favouriteHomes = registerHome.filter((home) =>
        favouriteIds.includes(home.id),
      );
>>>>>>> 4d9e1d60236c72f46f917082e0dc05747ccf5159

      res.render("store/favourite-list", {
        registerHome: favouriteHomes,
        PageTitle: "My Favourites",
        currentPage: "Favourites",
      });
    });
  });
};

<<<<<<< HEAD
// Add a home to favorites
=======
// 6. Add home to favourites
>>>>>>> 4d9e1d60236c72f46f917082e0dc05747ccf5159
exports.postAddFavourites = (req, res, next) => {
  const homeId = req.body.id;

  if (!homeId) {
    console.error("❌ Home ID not provided");
    return res.status(400).redirect("/homes");
  }

<<<<<<< HEAD
=======
  // Check whether home exists
>>>>>>> 4d9e1d60236c72f46f917082e0dc05747ccf5159
  Home.findById(homeId)
    .then((home) => {
      if (!home) {
        console.error("❌ Home not found for ID:", homeId);
        return res.status(404).redirect("/homes");
      }

<<<<<<< HEAD
      return Favourite.findOne({ homeId: homeId }).then((existingFav) => {
        if (existingFav) {
          console.log("⚠️ Home already in favorites:", homeId);
          return res.redirect("/favourites");
        }

=======
      // Check if already favourite
      return Favourite.findOne({ homeId: homeId }).then((existingFav) => {
        if (existingFav) {
          console.log("⚠️ Home already in favourites:", homeId);
          return res.redirect("/favourites");
        }

        // Create new favourite
>>>>>>> 4d9e1d60236c72f46f917082e0dc05747ccf5159
        const newFav = new Favourite({
          homeId: homeId,
        });

        return newFav.save().then((result) => {
          console.log("✅ Favourite added successfully:", result._id);
          res.redirect("/favourites");
        });
      });
    })
    .catch((error) => {
      console.error("❌ Error while adding favourite:", error.message);
      next(error);
    });
};

<<<<<<< HEAD
// Remove a home from favorites
=======
// 7. Remove home from favourites
>>>>>>> 4d9e1d60236c72f46f917082e0dc05747ccf5159
exports.postRemoveFavourites = (req, res, next) => {
  const homeId = req.params.homeId;

  if (!homeId) {
    console.error("❌ Home ID not provided for removal");
    return res.status(400).redirect("/favourites");
  }

  Favourite.findOneAndDelete({ homeId: homeId })
    .then((result) => {
      if (result) {
<<<<<<< HEAD
        console.log("✅ Favorite removed successfully:", result._id);
      } else {
        console.warn("⚠️ Favorite not found for homeId:", homeId);
=======
        console.log("✅ Favourite removed successfully:", result._id);
      } else {
        console.warn("⚠️ Favourite not found for homeId:", homeId);
>>>>>>> 4d9e1d60236c72f46f917082e0dc05747ccf5159
      }

      res.redirect("/favourites");
    })
    .catch((error) => {
      console.error("❌ Error while removing favourite:", error.message);
      next(error);
    });
};

<<<<<<< HEAD
// Home details
=======
// 8. Home details
>>>>>>> 4d9e1d60236c72f46f917082e0dc05747ccf5159
exports.getHomesDetails = (req, res, next) => {
  const homeId = req.params.homeId;

  console.log("At home detail page:", homeId);

<<<<<<< HEAD
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
=======
  Home.findById(homeId, (home) => {
    console.log("Found home:", home);

    if (!home) {
      console.log("Home not found for ID:", homeId);
      return res.status(404).render("error", {
        PageTitle: "Home Not Found",
        currentPage: "404",
>>>>>>> 4d9e1d60236c72f46f917082e0dc05747ccf5159
      });
    }

    res.render("store/home-details", {
      home,
      PageTitle: "Home Detail",
      currentPage: "Home",
    });
  });
};
