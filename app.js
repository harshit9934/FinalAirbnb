//external module
const express = require("express");
const bodyParser = require("body-parser");

const path = require("path");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// import routers
const hostRouter = require("./routes/hostRouter.js");

// import pathUtils from utils folder
const rootDir = require("./utils/pathUtils.js");

// making middleware  that locks  url and method lock

app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

// use of body-parser
app.use(bodyParser.urlencoded({ extended: false }));

// import controllers local module
const homesController = require("./controllers/storeController.js");

// main site routes
app.get("/", homesController.getIndex);
app.get("/index", homesController.getIndex);
app.get("/homes", homesController.getHomes);
app.get("/bookings", homesController.getBookings);
app.get("/favourites", homesController.getFavouriteList);

// use of host router
app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, "public")));

// use of 404 error  when  resp not send
app.use(homesController.addError);
const PORT = 3012;
app.listen(PORT, () => {
  console.log(`Server is running on  address http://localhost:${PORT}`);
});
