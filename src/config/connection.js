require("dotenv").config();
const sequelize = require("sequelize");
const dbOptions = {
  host: "localhost",
  dialect: "mysql",
  port: "3306",
  logging: false,
};
const dbName = "tri_via_hub";
const dbUser = "root";
const dbPassword = "password";
let connection;
if (process.env.JAWSDB_URL) {
  // connection for heroku
  connection = new sequelize(process.env.JAWSDB_URL);
} else {
  // connection for local development
  connection = new sequelize(dbName, dbUser, dbPassword, dbOptions);
}
module.exports = connection;
