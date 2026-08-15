const mongo = require("mongodb");

const MongoClient = mongo.MongoClient;

const MONGO_URL =
  "mongodb+srv://harshit:harshit123@apnacoding.5onc2nj.mongodb.net/?appName=ApnaCoding";

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(MONGO_URL)
    .then((client) => {
      console.log("MongoDB connected successfully");

      _db = client.db("airbnb");

      callback();
    })
    .catch((err) => {
      console.log("MongoDB connection failed:");
      console.log(err);
    });
};

const getDB = () => {
  if (!_db) {
    throw new Error("Mongo not connected");
  }

  return _db;
};

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
