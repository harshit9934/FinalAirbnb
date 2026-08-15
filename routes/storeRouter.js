// External Module
const express = require("express");
const storeRouter = express.Router();

// Local Module
const storeController = require("../controllers/storeController");

storeRouter.get("/", storeController.getIndex);
storeRouter.get("/homes", storeController.getHomes);
storeRouter.get("/bookings", storeController.getBookings);
storeRouter.get("/favourites", storeController.getFavouriteList);

// handle /homes/:homeId
storeRouter.get("/homes/:homeId", storeController.getHomeDetails);

// handle favourite POST request
storeRouter.post("/favourites", storeController.postAddToFavourite);

// delete home from favourite
storeRouter.get("/homes/:homeId", storeController.getHomeDetails);
storeRouter.post("/favourites", storeController.postAddToFavourite);
storeRouter.post(
  "/favourites/delete/:homeId",
  storeController.postRemoveFromFavourite,
);

module.exports = storeRouter;
