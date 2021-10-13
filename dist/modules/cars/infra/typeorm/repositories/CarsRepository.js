"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsRepository = void 0;

var _typeorm = require("typeorm");

var _Cars = require("../entities/Cars");

class CarsRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Cars.Car);
  }

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
    specifications,
    id
  }) {
    const car = this.repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
      specifications,
      id
    });
    await this.repository.save(car);
    return car;
  }

  async findByLicensePlate(license_plate) {
    const car = await this.repository.findOne({
      license_plate
    });
    return car;
  }

  async findAllAvailable(brand, category_id, name) {
    const carsQuery = this.repository.createQueryBuilder("c").where("available = :available", {
      available: true
    });

    if (brand) {
      carsQuery.andWhere("c.brand = :brand", {
        brand
      });
    }

    if (name) {
      carsQuery.andWhere("c.name = :name", {
        name
      });
    }

    if (category_id) {
      carsQuery.andWhere("c.category_id = :category_id", {
        category_id
      });
    }

    const cars = await carsQuery.getMany();
    return cars;
  }

  async findById(id) {
    const car = await this.repository.findOne({
      id
    });
    return car;
  }

  async updateAvailable(id, available) {
    await this.repository.createQueryBuilder().update().set({
      available
    }).where("id = :id").setParameters({
      id
    }).execute(); // update cars
  }

}

exports.CarsRepository = CarsRepository;