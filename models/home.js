const db = require("../utils/database");

module.exports = class Home {
  constructor(homeName, price, location, rating, photo, description) {
    this.homeName = homeName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photo = photo;
    this.description = description;
  }

  save() {
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
};
