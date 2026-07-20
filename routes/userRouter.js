// core module immport
const path = require("path");

//ecternal module import
const express = require("express");

//naya router banane ke liye
const userRouter = express.Router();

// import pathUtils from utils folder
const rootDir = require("../utils/pathUtils.js");

//import controller  local module
const homesController = require("../controllers/home.js");

// 1  middleware
userRouter.get("/", homesController.getHomes);
//  for every path and   ye user ke liye hai

// export
module.exports = userRouter;
