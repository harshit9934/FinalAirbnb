// external module import
const express = require("express");

// naya router banane ke liye
const authRouter = express.Router();

// import controller local module
const authController = require("../controllers/authController.js");

// middleware
authRouter.get("/login", authController.getLogin);
authRouter.post("/auth/login", authController.postLogin);
authRouter.post("/logout", authController.postLogout);

// export
module.exports = authRouter;
