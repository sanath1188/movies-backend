/**
 * @fileOverview Establishes connection to database and exposes the database object
 */

const Sequelize = require('sequelize');
const config = require('config');
mysql = require('mysql2');
const host = config.get('dbConfig.mysql.host');
const database = config.get('dbConfig.mysql.database');
const username = config.get('dbConfig.mysql.username');
const password = config.get('dbConfig.mysql.password');

let db = null;
/** If host is the same as replicationHost, don't create a separate read replica list. */

db = new Sequelize(
  database,
  username,
  password,
  {
    host: host,
    port: 3306,
    dialect: 'mysql',
    pool: {
      /** Set maxIdleTime to x seconds. Otherwise, it kills transactions that */
      /** are open for long. */
      maxIdleTime: 10000,
      idle: 10000
    },
    /** Global definitions on how we want sequelize to treat models and column names. */
    define: {
      timestamps: false,
      underscored: true,
    },
    benchmark: true,
    logging: false
  }
);

db.authenticate().then(function (err) {
  if (err) {
    dev.error(err);
  } else {
    console.log("successfully connected to database");
  }
});

(function (closeDb) { // Immediate function.
  process.on('SIGINT', closeDb);
  process.on('SIGTERM', closeDb);
})(function () { // Callback.
  db.close();
  dev.log("closed sequelize connection");
  process.exit();
});

module.exports = db;
