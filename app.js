// Core Module
const path = require("path");

// External Module
const express = require("express");
const nodedns = require("dns");

// MongoDB SRV DNS fix
nodedns.setServers(["1.1.1.1", "8.8.8.8"]);

// Local Module
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtils");
const errorsController = require("./controllers/errors");
const { mongoConnect } = require("./utils/databaseUtil");
const Home = require("./models/home");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));

app.use(storeRouter);
app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, "public")));

app.use(errorsController.pageNotFound);

const PORT = 3000;

mongoConnect(() => {
  // Cleanup old fields from database
  Home.cleanupOldFields()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server running on address http://localhost:${PORT}`);
      });
    })
    .catch((err) => {
      console.log("Error during cleanup:", err);
      app.listen(PORT, () => {
        console.log(`Server running on address http://localhost:${PORT}`);
      });
    });
});
