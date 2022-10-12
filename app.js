/**
 * @fileOverview Express application.
 */
let bodyParser = require("body-parser");
let express = require("express");
let useragent = require('express-useragent');
let path = require("path");
let config = require("config");
let port = config.get("port");
let cors = require("cors");

const compression = require("compression");

let app = express();

app.use(compression())

app.set("port", process.env.PORT || 5000);

app.use(useragent.express());
app.use(bodyParser.json({ limit: "2048mb" }));
app.use(bodyParser.urlencoded({ limit: "2048mb", extended: true, parameterLimit: 500000 }));

app.use(cors({
  credentials: true,
}));

/** Error Prototype Configuration */
if (!("toJSON" in Error.prototype)) {
  Object.defineProperty(Error.prototype, "toJSON", {
    value: function () {
      let ret = {};

      Object.getOwnPropertyNames(this).forEach(function (key) {
        ret[key] = this[key];
      }, this);

      return ret;
    },

    configurable: true,
    writable: true
  });
}

module.exports = app;
