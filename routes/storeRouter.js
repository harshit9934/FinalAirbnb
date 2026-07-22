// core module immport
const path = require("path");

//ecternal module import
const express = require("express");

//naya router banane ke liye
const storeRouter = express.Router();

// import pathUtils from utils folder
const rootDir = require("../utils/pathUtils.js");

//import controller  local module
const homesController = require("../controllers/storeController.js");

// 1  middleware
storeRouter.get("/", homesController.getIndex);
storeRouter.get("/homes", homesController.getHomes);
//  for every path and   ye user ke liye hai
storeRouter.get("/bookings", homesController.getBookings);
storeRouter.get("/favourites", homesController.getFavouriteList);

// export
module.exports = storeRouter;
