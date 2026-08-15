const { ObjectId } = require("mongodb");
const { getDB } = require("../utils/databaseUtil");

module.exports = class Home {
  constructor(homeName, price, location, rating, photo, description, id) {
    this.homeName = homeName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photo = photo;
    this.description = description;

    if (id) {
      this.id = id;
    }
  }

  save() {
    const db = getDB();

    if (this.id) {
      // update
      const updateFields = {
        homeName: this.homeName,
        price: this.price,
        location: this.location,
        rating: this.rating,
        photo: this.photo,
        description: this.description,
      };

      return db.collection("homes").updateOne(
        { _id: new ObjectId(String(this.id)) },
        {
          $set: updateFields,
          $unset: {
            houseName: "",
            photoUrl: "",
          },
        },
      );
    } else {
      // insert
      return db.collection("homes").insertOne(this);
    }
  }

  static fetchAll() {
    const db = getDB();

    return db
      .collection("homes")
      .find()
      .toArray()
      .then((homes) => {
        return homes.map((home) => {
          if (home._id) {
            home.id = home._id;
          }

          return home;
        });
      });
  }

  static findById(homeId) {
    const db = getDB();

    return db
      .collection("homes")
      .find({ _id: new ObjectId(String(homeId)) })
      .next()
      .then((home) => {
        if (home && home._id) {
          home.id = home._id;
        }

        return home;
      });
  }

  static deleteById(homeId) {
    const db = getDB();

    return db
      .collection("homes")
      .deleteOne({ _id: new ObjectId(String(homeId)) });
  }

  // Cleanup old fields from all documents
  static cleanupOldFields() {
    const db = getDB();

    return db
      .collection("homes")
      .updateMany(
        {},
        {
          $unset: {
            houseName: "",
            photoUrl: "",
          },
        },
      )
      .then((result) => {
        console.log(
          `Cleaned up ${result.modifiedCount} documents - removed houseName and photoUrl fields`,
        );

        return result;
      });
  }
};
