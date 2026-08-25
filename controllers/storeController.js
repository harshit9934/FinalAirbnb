const Favourite = require("../models/favourite");
const Home = require("../models/home");

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
    });
  } catch (error) { next(error); }
};

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
};
