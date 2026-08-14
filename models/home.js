// import database utils
const db = require("../utils/databaseUtil.js");

module.exports = class Home {
  constructor(
    homeName,
    price,
    location,
    rating,
    photo,
    description,
    id = null,
  ) {
    this.homeName = homeName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photo = photo;
    this.description = description;
    this.id = id;
  }

  save() {
    if (this.id) {
      return db.execute(
        "UPDATE homes SET homeName = ?, price = ?, location = ?, rating = ?, photo = ?, description = ? WHERE id = ?",
        [
          this.homeName,
          this.price,
          this.location,
          this.rating,
          this.photo,
          this.description,
          this.id,
        ],
      );
    }

    return db.execute(
      "INSERT INTO homes (homeName, price, location, rating, photo, description) VALUES (?, ?, ?, ?, ?, ?)",
      [
        this.homeName,
        this.price,
        this.location,
        this.rating,
        this.photo,
        this.description,
      ],
    );
  }

  static fetchAll() {
    return db.execute("SELECT * FROM homes");
  }

  static findById(homeId) {
    return db.execute("SELECT * FROM homes WHERE id = ?", [homeId]);
  }

  static deletById(homeId) {
    return db.execute("DELETE FROM homes WHERE id = ?", [homeId]);
  }

  static updateById(updatedHome) {
    return db.execute(
      "UPDATE homes SET homeName = ?, price = ?, location = ?, rating = ?, photo = ?, description = ? WHERE id = ?",
      [
        updatedHome.homeName,
        updatedHome.price,
        updatedHome.location,
        updatedHome.rating,
        updatedHome.photo,
        updatedHome.description,
        updatedHome.id,
      ],
    );
  }
};
