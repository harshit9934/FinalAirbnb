// Core Module
const path = require("path");
const dns = require("dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

// External Module
const express = require("express");
const session = require("express-session");
const mongodbstore = require("connect-mongodb-session")(session);
// Use the real Atlas SRV connection string here. This project currently keeps the
// DNS override above so Node can resolve the MongoDB Atlas SRV record correctly.
const DB_PATH =
  "mongodb+srv://harshit:harshit123@apnacoding.5onc2nj.mongodb.net/airbnb?appName=ApnaCoding";

//Local Module
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const authRouter = require("./routes/authRouter");
const rootDir = require("./utils/pathUtils");
const errorsController = require("./controllers/errors");
const mongoose = require("mongoose");

const app = express();

// view engine
app.set("view engine", "ejs");
app.set("views", "views");

//making a  new mongodbstore class according to  mongodbstore  and passing the session and mongodburl
const store = new mongodbstore({
  url: DB_PATH,
  collection: "sessions",
});
store.on("error", (error) => {
  console.log("Session Store Error:", error);
});

//body parser
app.use(express.urlencoded());

//midleware for sesion
app.use(
  session({
    secret: "my-secret", //// secret key used to sign the session  Id and encrypt  session data
    resave: false, //.Forces session  to be saved back  to the session store , even if not modified
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
      httpOnly: true,
      secure: false, // set to true in production with HTTPS
    },
  }),
);

//  using for reading cookis mention  inalso in controller  but now by using session
app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn || false; // using session to read cookie
  req.user = req.session.user || null; // store user in request

  // //req.isLoggedIn = req.get("cookie")
  //   ? req.get("cookie").split("=")[1] === "true"
  //   : false;
  next();
});

// Routes
app.use(authRouter);
app.use(storeRouter);
app.use("/host", (req, res, next) => {
  if (req.isLoggedIn) {
    return next();
  }

  return res.redirect("/login");
});
app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, "public")));

app.use(errorsController.pageNotFound);

const PORT = 3019;

mongoose
  .connect(DB_PATH, {
    ssl: true,
    tls: true,
    tlsAllowInvalidCertificates: true,
    tlsAllowInvalidHostnames: true,
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    console.log("Connected to MongoDB:", DB_PATH);
    app.listen(PORT, () => {
      console.log(`Server running on address http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error while connecting to Mongo: ", err);
  });
