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

const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "harshit@1234",
  database: process.env.DB_NAME || "airbnb",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool.promise();
