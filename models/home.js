// core modules
const path = require("path");
const fs = require("fs");
const rootDir = require("../utils/pathUtils.js");

module.exports = class Home {
  constructor(homeName, price, location, rating, photo) {
    this.homeName = homeName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photo = photo;
  }

  save() {
    Home.fetchAll((registerHome) => {
      // phele register home ko feth kr ke lao
      registerHome.push(this);
      const homeDataPath = path.join(rootDir, "data", "home.json"); // joint the path for write data
      // write  + error handeling
      fs.writeFile(homeDataPath, JSON.stringify(registerHome), (error) => {
        console.log("file writing concluded ", error);
      });
    });
  }

  static fetchAll(callback) {
    //path for read data
    const homeDataPath = path.join(rootDir, "data", "home.json");
    // read + error handeling
    fs.readFile(homeDataPath, "utf8", (error, data) => {
      console.log("file read ", error, data);
      if (!error) {
        callback(JSON.parse(data));
      } else {
        callback([]);
      }
    });
  }
};
