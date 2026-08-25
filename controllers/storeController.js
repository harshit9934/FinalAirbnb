const Favourite = require("../models/favourite");
const Home = require("../models/home");

<<<<<<< HEAD
exports.getIndex = async (req, res, next) => {
  try {
    const [registeredHomes] = await Home.fetchAll();
    res.render("store/index", { registeredHomes, PageTitle: "Airbnb Home", currentPage: "index" });
  } catch (error) { next(error); }
};

exports.getHomes = async (req, res, next) => {
  try {
    const [registeredHomes] = await Home.fetchAll();
    res.render("store/Home-list", { registeredHomes, PageTitle: "Homes List", currentPage: "Home" });
  } catch (error) { next(error); }
};

exports.getBookings = (req, res) => {
  res.render("store/bookings", { PageTitle: "My Bookings", currentPage: "bookings" });
};

exports.getFavouriteList = async (req, res, next) => {
  try {
    const [homes] = await Home.fetchAll();
    const [favourites] = await Favourite.fetchAll();
    const favouriteIds = new Set(favourites.map(({ homeId }) => homeId));
    res.render("store/favourite-list", {
      favouriteHomes: homes.filter((home) => favouriteIds.has(home.id)),
      PageTitle: "My Favourites", currentPage: "Favourite",
=======
exports.getIndex = (req, res, next) => {
  console.log("session value : ", req.session);
  Home.find()
    .then((registeredHomes) => {
      res.render("store/index", {
        registerHome: registeredHomes,
        PageTitle: "airbnb Home",
        currentPage: "index",
        isLoggedIn: req.isLoggedIn,
      });
    })
    .catch((error) => {
      console.error("Error fetching homes:", error);
      next(error);
>>>>>>> 4efd59f ( ch18 cookis and session)
    });
  } catch (error) { next(error); }
};

<<<<<<< HEAD
exports.postAddToFavourite = async (req, res, next) => {
  try {
    await Favourite.add(req.body.homeId);
    res.redirect("/favourites");
  } catch (error) { next(error); }
};

exports.postRemoveFromFavourite = async (req, res, next) => {
  try {
    await Favourite.deleteByHomeId(req.params.homeId);
    res.redirect("/favourites");
  } catch (error) { next(error); }
};

exports.getHomeDetails = async (req, res, next) => {
  try {
    const [homes] = await Home.findById(req.params.homeId);
    const home = homes[0];
    if (!home) return res.redirect("/homes");
    res.render("store/home-details", { home, PageTitle: "Home Detail", currentPage: "Home" });
  } catch (error) { next(error); }
=======
exports.getHomes = (req, res, next) => {
  Home.find()
    .then((registeredHomes) => {
      res.render("store/home-list", {
        registerHome: registeredHomes,
        PageTitle: "Homes List",
        currentPage: "Home",
        isLoggedIn: req.isLoggedIn,
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
    isLoggedIn: req.isLoggedIn,
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
        isLoggedIn: req.isLoggedIn,
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
        isLoggedIn: req.isLoggedIn,
      });
    })
    .catch((error) => {
      console.error("Error fetching home details:", error);
      next(error);
    });
>>>>>>> 4efd59f ( ch18 cookis and session)
};
