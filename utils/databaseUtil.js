const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "harshit@1234",
  database: "airbnb",
});

module.exports = pool.promise();
