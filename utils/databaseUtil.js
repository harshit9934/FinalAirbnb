const mongo = require("mongodb");

// This function is used to connect to the MongoDB database
const MongoClient = mongo.MongoClient; // this is a core module or class of mongodb package

// Using a direct connection string because Node's DNS SRV resolver is blocked (ECONNREFUSED)
// while nslookup + direct TCP to the shards succeed on this network.
const Mongo_URL =
  "mongodb://harshit:harshit9934@ac-guuzqsl-shard-00-00.5onc2nj.mongodb.net:27017,ac-guuzqsl-shard-00-01.5onc2nj.mongodb.net:27017,ac-guuzqsl-shard-00-02.5onc2nj.mongodb.net:27017/?ssl=true&replicaSet=atlas-gmu92k-shard-0&authSource=admin&retryWrites=true&w=majority";

let db;
const mongoConnect = (callback) => {
  MongoClient.connect(Mongo_URL)
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
