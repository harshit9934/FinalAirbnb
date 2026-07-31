// core module immport
const path = require("path");

//ecternal module import
const express = require("express");

//naya router banane ke liye
const storeRouter = express.Router();

// import pathUtils from utils folder
const rootDir = require("../utils/pathUtils.js");

//import controller  local module
const storeController = require("../controllers/storeController.js");

// 1  middleware
storeRouter.get("/", storeController.getIndex);
storeRouter.get("/homes", storeController.getHomes);
//  for every path and   ye user ke liye hai
storeRouter.get("/bookings", storeController.getBookings);
storeRouter.get("/favourites", storeController.getFavouriteList); // add  fav get req

//handeling   for /homes /:home-id.
storeRouter.get("/homes/:homeId", storeController.getHomesDetails);
//handle fav post req
storeRouter.post("/favourites", storeController.postAddToFavourite);

// delete home from favourite
storeRouter.post(
  "/favourites/delete/:homeId",
  storeController.postRemoveFromFavourite,
);

// export
module.exports = storeRouter;
