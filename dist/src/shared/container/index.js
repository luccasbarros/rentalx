"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tsyringe_1 = require("tsyringe");
require("./providers");
var UsersRepository_1 = require("../../modules/accounts/infra/typeorm/repositories/UsersRepository");
var CategoriesRepository_1 = require("../../modules/cars/infra/typeorm/repositories/CategoriesRepository");
var SpecificationRepository_1 = require("../../modules/cars/infra/typeorm/repositories/SpecificationRepository");
var CarsRepository_1 = require("../../modules/cars/infra/typeorm/repositories/CarsRepository");
var CarsImageRepository_1 = require("../../modules/cars/infra/typeorm/repositories/CarsImageRepository");
var RentalsRepository_1 = require("../../modules/rentals/infra/typeorm/repositories/RentalsRepository");
var UsersTokensRepository_1 = require("../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository");
// ICategoriesRepository
tsyringe_1.container.registerSingleton("CategoriesRepository", CategoriesRepository_1.CategoriesRepository);
tsyringe_1.container.registerSingleton("SpecificationsRepository", SpecificationRepository_1.SpecificationsRepository);
tsyringe_1.container.registerSingleton("UsersRepository", UsersRepository_1.UsersRepository);
tsyringe_1.container.registerSingleton("CarsRepository", CarsRepository_1.CarsRepository);
tsyringe_1.container.registerSingleton("CarsImageRepository", CarsImageRepository_1.CarsImagesRepository);
tsyringe_1.container.registerSingleton("RentalsRepository", RentalsRepository_1.RentalsRepository);
tsyringe_1.container.registerSingleton("UsersTokensRepository", UsersTokensRepository_1.UsersTokensRepository);
