// external modules
const express = require("express");

const hostRouter = express.Router();
const hostController = require("../controllers/hostController");

//import controllers local module

hostRouter.get("/add-home", hostController.getAddHome); // for  add home

// midddleware that colect data and give success

hostRouter.post("/add-home", hostController.postAddHome);
hostRouter.get("/host-home-list", hostController.getHostHomes);

hostRouter.get("/edit-home/:homeId", hostController.getEditHome);
hostRouter.post("/edit-home", hostController.postEditHome); // for edit home
hostRouter.post("/delete-home/:homeId", hostController.postDeleteHome); // delete handeling
module.exports = hostRouter;
