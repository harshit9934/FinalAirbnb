// core modules
const path = require("path");

// external modules
const express = require("express");

const hostRouter = express.Router();
// import pathUtils from utils folder
const rootDir = require("../utils/pathUtils.js");

//import controllers local module
const homesController = require("../controllers/home.js");

hostRouter.get("/add-home", homesController.getAddHome); // for  add home

// midddleware that colect data and give success

hostRouter.post("/add-home", homesController.postAddHome);

exports.hostRouter = hostRouter;
