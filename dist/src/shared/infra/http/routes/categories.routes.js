"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesRoutes = void 0;
var express_1 = require("express");
var CreateCategoryController_1 = require("../../../../modules/cars/useCases/createCategory/CreateCategoryController");
var ListCategoriesController_1 = require("../../../../modules/cars/useCases/listCategories/ListCategoriesController");
var ImportCategoryController_1 = require("../../../../modules/cars/useCases/importCategory/ImportCategoryController");
var multer_1 = __importDefault(require("multer"));
var ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
var ensureAdmin_1 = require("../middlewares/ensureAdmin");
exports.categoriesRoutes = express_1.Router();
var upload = multer_1.default({
    dest: "./tmp",
});
var createCategoryController = new CreateCategoryController_1.CreateCategoryController();
var importCategoryController = new ImportCategoryController_1.ImportCategoryController();
var listCategoriesController = new ListCategoriesController_1.ListCategoriesController();
exports.categoriesRoutes.post("/", ensureAuthenticated_1.ensureAuthenticated, ensureAdmin_1.ensureAdmin, createCategoryController.handle);
exports.categoriesRoutes.get("/", listCategoriesController.handle);
exports.categoriesRoutes.post("/import", ensureAuthenticated_1.ensureAuthenticated, ensureAdmin_1.ensureAdmin, upload.single("file"), ensureAuthenticated_1.ensureAuthenticated, ensureAdmin_1.ensureAdmin, importCategoryController.handle);
