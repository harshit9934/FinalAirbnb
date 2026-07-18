// core module immport
const path = require("path");

//ecternal module import
const express = require("express");

//naya router banane ke liye
const userRouter = express.Router();

// import pathUtils from utils folder
const rootDir = require("../utils/pathUtils.js");
const { registerHome } = require("./hostRouter.js");

// 1  middleware
userRouter.get("/", (req, res, next) => {
  console.log(registerHome);
  res.render("Home", { registerHome, PageTitle: "airbnb Home" , currentPage :'Home' });
});
//  for every path and   ye user ke liye hai

// export
module.exports = userRouter;
