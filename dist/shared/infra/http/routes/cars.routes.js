"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.carRoutes = void 0;

var _express = require("express");

var _upload = _interopRequireDefault(require("../../../../config/upload"));

var _ListAvailableCarsController = require("../../../../modules/cars/useCases/listAvailableCars/ListAvailableCarsController");

var _CreateCarController = require("../../../../modules/cars/useCases/createCar/CreateCarController");

var _ensureAdmin = require("../middlewares/ensureAdmin");

var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");

var _CreateCarSpecificationController = require("../../../../modules/cars/useCases/createCarSpecification/CreateCarSpecificationController");

var _UploadCarImageController = require("../../../../modules/cars/useCases/uploadCarImage/UploadCarImageController");

var _multer = _interopRequireDefault(require("multer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const carRoutes = (0, _express.Router)();
exports.carRoutes = carRoutes;
const createCarController = new _CreateCarController.CreateCarController();
const listAvailableCarsController = new _ListAvailableCarsController.ListAvailableCarsController();
const createCarSpecificationController = new _CreateCarSpecificationController.CreateCarSpecificationController();
const uploadCarImageController = new _UploadCarImageController.UploadCarImageController();
const upload = (0, _multer.default)(_upload.default);
carRoutes.post("/", _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, createCarController.handle);
carRoutes.get("/available", listAvailableCarsController.handle);
carRoutes.post("/specifications/:id", _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, createCarSpecificationController.handle);
carRoutes.post("/images/:id", _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, upload.array("images"), uploadCarImageController.handle);