// External modules

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Import routers
const hostRouter = require("./routes/hostRouter.js");
const storeRouter = require("./routes/storeRouter.js");

// Import controllers
const homesController = require("./controllers/storeController.js");

// MySQL database
const db = require("./utils/databaseUtil.js");

db.execute("SELECT 1")
  .then(() => {
    console.log("Connected to MySQL database successfully");
  })
  .catch((err) => {
    console.log("MySQL connection error:", err.message);
  });

// Import pathUtils
const rootDir = require("./utils/pathUtils.js");

// Middleware
app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));

// Host router
app.use("/host", hostRouter);

// Store router
app.use(storeRouter);

// Static files
app.use(express.static(path.join(rootDir, "public")));

// 404 error handler
app.use(homesController.addError);

const PORT = 3017;

// MongoDB connection
const DB_Path = "mongodb://localhost:27017/airbnb";

// Connect to MongoDB
mongoose
  .connect(DB_Path, {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB with Mongoose");

    app.listen(PORT, () => {
      console.log(`✅ Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:");
    console.error("Error Code:", err.code);
    console.error("Error Message:", err.message);

    console.error("\n⚠️ POSSIBLE SOLUTIONS:");
    console.error("1. Check whether MongoDB is running.");
    console.error("2. Check MongoDB connection URL.");
    console.error("3. Make sure MongoDB is installed.");
  });
