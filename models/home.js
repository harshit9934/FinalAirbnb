// import database utils
const { getDB } = require("../utils/databaseUtil.js");
const { ObjectId } = require("mongodb");

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
    const db = getDB();
    if (this.id) {
      // perform an update if an id is present
      return db.collection("homes").updateOne(
        { _id: new ObjectId(this.id) },
        {
          $set: {
            homeName: this.homeName,
            price: this.price,
            location: this.location,
            rating: this.rating,
            photo: this.photo,
            description: this.description,
          },
        }, // update
      );
    }
    // otherwise insert a new home
    return db.collection("homes").insertOne(this);
  }

  static fetchAll() {
    const db = getDB();
    return db
      .collection("homes")
      .find()
      .toArray() // return a promise
      .then((homes) => {
        return homes.map((home) => {
          home.id = home._id.toString();
          return home;
        });
      });
  }

  static findById(homeId) {
    const db = getDB();
    return db
      .collection("homes")
      .findOne({ _id: new ObjectId(homeId) })
      .then((home) => (home ? ((home.id = home._id.toString()), home) : null));
  }

  static deleteById(homeId) {
    const db = getDB();
    return db.collection("homes").deleteOne({ _id: new ObjectId(homeId) });
  }

  static updateById(updatedHome) {
    const db = getDB();
    return db.collection("homes").updateOne(
      { _id: new ObjectId(updatedHome.id) },
      {
        $set: {
          homeName: updatedHome.homeName,
          price: updatedHome.price,
          location: updatedHome.location,
          rating: updatedHome.rating,
          photo: updatedHome.photo,
          description: updatedHome.description,
        },
      },
    );
  }
};
