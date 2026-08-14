const { getDB } = require("../utils/databaseUtil.js");

module.exports = class Favourite {
  constructor(homeId) {
    this.homeId = homeId;
  }

  // 3b: save() - prevent duplicate records using an upsert on homeId
  save() {
    const db = getDB();
    return db.collection("favourites").updateOne(
      { homeId: this.homeId },
      {
        $setOnInsert: { homeId: this.homeId },
      },
      { upsert: true },
    );
  }

  // 2a / 3a: fetchAll() - fetch all favourites via Mongo
  static fetchAll() {
    const db = getDB();
    return db
      .collection("favourites")
      .find()
      .toArray() // return a promise
      .then((homes) => {
        return homes.map((home) => {
          home.id = home._id.toString();
          return home;
        });
      });
  }

  // 3c: deleteById() - remove a favourite by homeId
  static deleteById(delHomeId) {
    const db = getDB();
    return db.collection("favourites").deleteOne({ homeId: delHomeId });
  }
};
