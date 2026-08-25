// external module import
const express = require("express");

// naya router banane ke liye
const storeRouter = express.Router();

// import controller local module
const storeController = require("../controllers/storeController.js");

// middleware
storeRouter.get("/", storeController.getIndex);
storeRouter.get("/homes", storeController.getHomes);

// user ke liye
storeRouter.get("/bookings", storeController.getBookings);
storeRouter.get("/favourites", storeController.getFavouriteList);

// handle /homes/:homeId
storeRouter.get("/homes/:homeId", storeController.getHomeDetails);

// handle favourite POST request
storeRouter.post("/favourites", storeController.postAddToFavourite);

// delete home from favourite
storeRouter.post(
  "/favourites/delete/:homeId",
  storeController.postRemoveFromFavourite,
);

// export
module.exports = storeRouter;
