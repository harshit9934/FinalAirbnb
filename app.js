// Core Module
const path = require("path");
const dns = require("dns");
const multer = require("multer");

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
  uri: DB_PATH,
  collection: "sessions",
});
store.on("error", (error) => {
  console.log("Session Store Error:", error);
});

// for custom file name
const randomString = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
const fs = require("fs");
const uploadDir = path.join(__dirname, "uploads");
const rulesDir = path.join(__dirname, "rules");

// Ensure uploads directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
if (!fs.existsSync(rulesDir)) {
  fs.mkdirSync(rulesDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, file.fieldname === "rules" ? rulesDir : uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, randomString(10) + "-" + file.originalname);
  },
});

// for backend ..{ restricting file uploads }
const fileFilter = (req, file, cb) => {
  if (file.fieldname === "rules" && file.mimetype === "application/pdf") {
    cb(null, true);
  } else if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const multerOptions = {
  storage,
  fileFilter,
};

//body parser  // handle urlencode
app.use(express.urlencoded());

app.use(express.static(path.join(rootDir, "public")));
app.use("/uploads", express.static(path.join(rootDir, "uploads")));
app.use("/host/uploads", express.static(path.join(rootDir, "uploads")));

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
app.use(
  "/host",
  multer(multerOptions).fields([
    { name: "photo", maxCount: 1 },
    { name: "rules", maxCount: 1 },
  ]),
);
app.use("/host", hostRouter);

app.use(errorsController.pageNotFound);

const PORT = process.env.PORT || 3020;

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
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error while connecting to Mongo: ", err);
  });
