const Favourite = require("../models/favourite");
const Home = require("../models/home");

// 1. Home page
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

// 2. Home list
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

// 3. Error page
exports.addError = (req, res, next) => {
  res.status(404).render("error", {
    PageTitle: "Page Not Found",
    currentPage: "404",
  });
};

// 4. Bookings
exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    PageTitle: "My Bookings",
    currentPage: "bookings",
  });
};

// 5. Get favourite homes
exports.getFavouriteList = (req, res, next) => {
  Favourite.find()
    .populate("homeId")
    .sort({ createdAt: -1 })
    .then((favourites) => {
      console.log(`✅ Found ${favourites.length} favourite(s)`);

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

// 6. Add home to favourites
exports.postAddFavourites = (req, res, next) => {
  const homeId = req.body.id;

  if (!homeId) {
    console.error("❌ Home ID not provided");
    return res.status(400).redirect("/homes");
  }

  // Check whether home exists
  Home.findById(homeId)
    .then((home) => {
      if (!home) {
        console.error("❌ Home not found for ID:", homeId);
        return res.status(404).redirect("/homes");
      }

      // Check if already favourite
      return Favourite.findOne({ homeId: homeId }).then((existingFav) => {
        if (existingFav) {
          console.log("⚠️ Home already in favourites:", homeId);
          return res.redirect("/favourites");
        }

        // Create new favourite
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

// 7. Remove home from favourites
exports.postRemoveFavourites = (req, res, next) => {
  const homeId = req.params.homeId;

  if (!homeId) {
    console.error("❌ Home ID not provided for removal");
    return res.status(400).redirect("/favourites");
  }

  Favourite.findOneAndDelete({ homeId: homeId })
    .then((result) => {
      if (result) {
        console.log("✅ Favourite removed successfully:", result._id);
      } else {
        console.warn("⚠️ Favourite not found for homeId:", homeId);
      }

      res.redirect("/favourites");
    })
    .catch((error) => {
      console.error("❌ Error while removing favourite:", error.message);
      next(error);
    });
};

// 8. Home details
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
          currentPage: "404",
        });
      }

      res.render("store/home-details", {
        home,
        PageTitle: "Home Detail",
        currentPage: "Home",
      });
    })
    .catch((error) => {
      console.log("Error while fetching home details:", error);
      next(error);
    });
};
