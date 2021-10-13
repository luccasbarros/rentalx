"use strict";

var _tsyringe = require("tsyringe");

require("./providers");

var _UsersRepository = require("../../modules/accounts/infra/typeorm/repositories/UsersRepository");

var _CategoriesRepository = require("../../modules/cars/infra/typeorm/repositories/CategoriesRepository");

var _SpecificationRepository = require("../../modules/cars/infra/typeorm/repositories/SpecificationRepository");

var _CarsRepository = require("../../modules/cars/infra/typeorm/repositories/CarsRepository");

var _CarsImageRepository = require("../../modules/cars/infra/typeorm/repositories/CarsImageRepository");

var _RentalsRepository = require("../../modules/rentals/infra/typeorm/repositories/RentalsRepository");

var _UsersTokensRepository = require("../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository");

// ICategoriesRepository
_tsyringe.container.registerSingleton("CategoriesRepository", _CategoriesRepository.CategoriesRepository);

_tsyringe.container.registerSingleton("SpecificationsRepository", _SpecificationRepository.SpecificationsRepository);

_tsyringe.container.registerSingleton("UsersRepository", _UsersRepository.UsersRepository);

_tsyringe.container.registerSingleton("CarsRepository", _CarsRepository.CarsRepository);

_tsyringe.container.registerSingleton("CarsImageRepository", _CarsImageRepository.CarsImagesRepository);

_tsyringe.container.registerSingleton("RentalsRepository", _RentalsRepository.RentalsRepository);

_tsyringe.container.registerSingleton("UsersTokensRepository", _UsersTokensRepository.UsersTokensRepository);