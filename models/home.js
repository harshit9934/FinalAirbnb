// core modules
const path = require("path");
const fs = require("fs");
const rootDir = require("../utils/pathUtils.js");
const Favourite = require("./favourite.js");

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

      if (this.id) {
        // edit home case
        registerHome = registerHome.map((home) => {
          if (home.id === this.id) {
            return this;
          }
          return home;
        });
      } else {
        //add home case
        this.id = Math.random().toString();
        registerHome.push(this);
      }
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

  static findById(homeId, callback) {
    Home.fetchAll((registerHome) => {
      const home = registerHome.find((h) => h.id === homeId);
      callback(home);
    });
  }
  // delete method
  static deletById(homeId, callback) {
    this.fetchAll((homes) => {
      homes = homes.filter((home) => home.id !== homeId);
      const homeDataPath = path.join(rootDir, "data", "home.json"); // joint the path for write data

      fs.writeFile(homeDataPath, JSON.stringify(homes), (error) => {
        Favourite.deletById(homeId, callback);
      });
    });
  }

  static updateById(updatedHome, callback) {
    Home.fetchAll((registerHome) => {
      const index = registerHome.findIndex((h) => h.id === updatedHome.id);
      if (index !== -1) {
        registerHome[index] = updatedHome;
      }
      const homeDataPath = path.join(rootDir, "data", "home.json");
      fs.writeFile(homeDataPath, JSON.stringify(registerHome), (error) => {
        console.log("file writing concluded ", error);
        if (callback) callback(error);
      });
    });
  }
};
