"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _default = async (host = "database_ignite") => {
  const defaultOption = await (0, _typeorm.getConnectionOptions)();
  const configDatabase = Object.assign(defaultOption, {
    host: process.env.NODE_ENV === "test" ? "localhost" : host,
    database: process.env.NODE_ENV === "test" ? "rentx_test" : defaultOption.database
  });
  return (0, _typeorm.createConnection)(configDatabase);
};

exports.default = _default;