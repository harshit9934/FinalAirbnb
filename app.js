// Core Module
const path = require("path");

// External Module
const express = require("express");

//Local Module
const storeRouter = require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtils");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded());
app.use(storeRouter);
app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, "public")));

app.use((req, res) => {
  res.status(404).render("error", {
    PageTitle: "Page Not Found",
    currentPage: "404",
  });
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).render("error", {
    PageTitle: "Server Error",
    currentPage: "500",
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});
