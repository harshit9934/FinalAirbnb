// Core Module
const path = require("path");
const dns = require("dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

// External Module
const express = require("express");

//Local Module
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtils");
const errorsController = require("./controllers/errors");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded());
app.use(storeRouter);
app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, "public")));

app.use(errorsController.pageNotFound);

const PORT = 3000;

// Use the real Atlas SRV connection string here. This project currently keeps the
// DNS override above so Node can resolve the MongoDB Atlas SRV record correctly.
const DB_PATH =
  "mongodb+srv://harshit:harshit123@apnacoding.5onc2nj.mongodb.net/airbnb?appName=ApnaCoding";

mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("Connected to MongoDB:", DB_PATH);
    app.listen(PORT, () => {
      console.log(`Server running on address http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error while connecting to Mongo: ", err);
  });
