const mongo = require("mongodb");
const dns = require("dns");

// This function is used to connect to the MongoDB database
const MongoClient = mongo.MongoClient; // this is a core module or class of mongodb package

// Use public DNS servers to bypass networks that block Node's DNS queries

dns.setServers(["8.8.8.8", "1.1.1.1", "8.8.4.4"]);

const Mongo_URL =
  "mongodb+srv://harshit:root@apnacoding.5onc2nj.mongodb.net/?retryWrites=true&w=majority";

let db;
const mongoConnect = (callback) => {
  MongoClient.connect(Mongo_URL, { serverSelectionTimeoutMS: 15000 })
    .then((client) => {
      console.log("Connected to MongoDB");
      db = client.db("airbnb"); // store the database object for later use
      callback(null, client);
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
      callback(err, null);
    });
}; // function to connect to the database and return the client object

// connecting
const getDB = () => {
  if (!db) {
    throw new Error("No database found!");
  }
  return db;
};
module.exports = { mongoConnect, getDB };
