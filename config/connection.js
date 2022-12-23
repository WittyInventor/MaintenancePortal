require("dotenv").config();

const Sequelize = require("sequelize");

// Create connection to our database, pass in your MySQL information for
// username and password
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: "127.0.0.1",
        dialect: "mysql",
        port: 3306,
        dialectOptions: {
          decimalNumbers: true,
        },
      }
    );

module.exports = sequelize;
