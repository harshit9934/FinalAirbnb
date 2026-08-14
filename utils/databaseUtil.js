const mongo = require("mongodb");
const dns = require("dns");

const MongoClient = mongo.MongoClient;

// Public DNS servers
dns.setServers(["8.8.8.8", "1.1.1.1", "8.8.4.4"]);

const Mongo_URL =
  "mongodb+srv://USERNAME:PASSWORD@apnacoding.5onc2nj.mongodb.net/?retryWrites=true&w=majority";

let db;

const mongoConnect = (callback) => {
  MongoClient.connect(Mongo_URL, {
    serverSelectionTimeoutMS: 15000,
  })
    .then((client) => {
      console.log("✅ Connected to MongoDB");

      db = client.db("airbnb");

      callback(null, client);
    })
    .catch((err) => {
      console.error("❌ Error connecting to MongoDB:", err.message);

      callback(err, null);
    });
};

const getDB = () => {
  if (!db) {
    throw new Error("No database found!");
  }

  return db;
};

module.exports = {
  mongoConnect,
  getDB,
};
