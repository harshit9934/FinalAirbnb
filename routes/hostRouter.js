// core modules
const path = require("path");

// external modules
const express = require("express");

const hostRouter = express.Router();
// import pathUtils from utils folder
const rootDir = require("../utils/pathUtils.js");
const hostController = require("../controllers/hostController");

//import controllers local module

hostRouter.get("/add-home", hostController.getAddHome); // for  add home

// midddleware that colect data and give success

hostRouter.post("/add-home", hostController.postAddHome);
hostRouter.get("/host-home-list", hostController.getHostHomes);
module.exports = hostRouter;
