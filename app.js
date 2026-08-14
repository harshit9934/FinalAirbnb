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

<<<<<<< HEAD
const db = require("./utils/databaseUtil.js");

db.execute("SELECT 1")
  .then(() => {
    console.log("Connected to MySQL database successfully");
  })
  .catch((err) => {
    console.log("MySQL connection error:", err.message);
  });
=======
//const { mongoConnect } = require("./utils/databaseUtil.js"); // import  to mongoDB

const { default: mongoose } = require("mongoose"); // import mongoose to connect to mongoDB
>>>>>>> 522ad1d645519ec09505b94a0c30cbc9fa210002

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

const PORT = 3017;
// connect to mongoose

// ⭐ LOCAL MongoDB - Use this for development/testing
const DB_Path = "mongodb://localhost:27017/airbnb";

// ❌ Commented out - Use only after fixing Atlas + Network issues
// const DB_Path =
//   "mongodb+srv://harshit:root@apnacoding.5onc2nj.mongodb.net/airbnb?retryWrites=true&w=majority";

mongoose
  .connect(DB_Path, {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    retryWrites: true,
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
    console.error("\n⚠️  POSSIBLE SOLUTIONS:");
    console.error(
      "1. Check MongoDB Atlas Dashboard - Is cluster 'apnacoding' RUNNING?",
    );
    console.error("   → If PAUSED, click 'Resume'");
    console.error("2. Go to Network Access - Add your IP address");
    console.error("   → Click 'Add IP Address' → 'Add Current IP Address'");
    console.error("3. Check Database Access - User 'harshit' should exist");
    console.error("4. If on Corporate Network/VPN:");
    console.error("   → Try disabling VPN/proxy");
    console.error("   → Contact IT about MongoDB Atlas access");
    process.exit(1);
  });
