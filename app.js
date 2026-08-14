//external module
const express = require("express");
const bodyParser = require("body-parser");

const path = require("path");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// import routers
const hostRouter = require("./routes/hostRouter.js");
const storeRouter = require("./routes/storeRouter.js");

// import controllers local module
const homesController = require("./controllers/storeController.js");

const db = require("./utils/databaseUtil.js");

db.execute("SELECT 1")
  .then(() => {
    console.log("Connected to MySQL database successfully");
  })
  .catch((err) => {
    console.log("MySQL connection error:", err.message);
  });

// import pathUtils from utils folder
const rootDir = require("./utils/pathUtils.js");

const { error } = require("console");

// making middleware  that locks  url and method lock

app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

// use of body-parser
app.use(bodyParser.urlencoded({ extended: false }));

// use of host router
app.use("/host", hostRouter);
// use of store router (handles /, /homes, /bookings, /favourites, /homes/:homeId)
app.use(storeRouter);

app.use(express.static(path.join(rootDir, "public")));

// use of 404 error  when  resp not send
app.use(homesController.addError);
const PORT = 3012;
app.listen(PORT, () => {
  console.log(`Server is running on  address http://localhost:${PORT}`);
});
