// core modules
const path = require("path");
const fs = require("fs");
const rootDir = require("../utils/pathUtils.js");

const favouriteDataPath = path.join(rootDir, "data", "favourite.json"); // joint the path for write data
// write  + error handeling

module.exports = class Favourite {
  // 1  static  file
  static addTofavourite(homeid, callback) {
    Favourite.getFavourite((favourites) => {
      // phele register home ko feth kr ke lao

      if (favourites.includes(homeid)) {
        console.log("Home is already marked Favourite");
      } else {
        favourites.push(homeid);
        fs.writeFile(favouriteDataPath, JSON.stringify(favourites), callback);
      }
    });
  }

  // 2  method  only read file
  static getFavourite(callback) {
    // read + error handeling
    fs.readFile(favouriteDataPath, "utf8", (error, data) => {
      console.log("file read ", error, data);
      if (!error) {
        callback(JSON.parse(data));
      } else {
        callback([]);
      }
    });
  }
  // delete method from fav
  static deletById(delHomeId, callback) {
    Favourite.getFavourite((homeIds) => {
      homeIds = homeIds.filter((homeid) => homeid !== delHomeId);
      fs.writeFile(favouriteDataPath, JSON.stringify(homeIds), callback);
    });
  }
};
