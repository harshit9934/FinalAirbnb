// Core Modules
const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtils.js");

const favouriteDataPath = path.join(rootDir, "data", "favourite.json");

module.exports = class Favourite {
  static addToFavourite(homeId, callback) {
    Favourite.getFavourites((favourites) => {
      // Convert to string for consistent comparison
      const homeIdStr = String(homeId);
      if (favourites.includes(homeIdStr)) {
        callback("Home is already marked favourite");
      } else {
        favourites.push(homeIdStr);
        fs.writeFile(favouriteDataPath, JSON.stringify(favourites), callback);
      }
    });
  }

  static getFavourites(callback) {
    fs.readFile(favouriteDataPath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }

  static deleteById(delHomeId, callback) {
    Favourite.getFavourites((homeIds) => {
      // Convert to string for consistent comparison
      const delHomeIdStr = String(delHomeId);
      homeIds = homeIds.filter((homeId) => delHomeIdStr !== String(homeId));
      fs.writeFile(favouriteDataPath, JSON.stringify(homeIds), callback);
    });
  }
};
