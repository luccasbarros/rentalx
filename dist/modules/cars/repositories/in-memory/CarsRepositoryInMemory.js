"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsRepositoryInMemory = void 0;

var _Cars = require("../../infra/typeorm/entities/Cars");

class CarsRepositoryInMemory {
  constructor() {
    this.cars = [];
  }

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    name,
    license_plate,
    id
  }) {
    const car = new _Cars.Car();
    Object.assign(car, {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      name,
      license_plate,
      id
    });
    this.cars.push(car);
    return car;
  }

  async findByLicensePlate(license_plate) {
    return this.cars.find(car => car.license_plate === license_plate);
  }

  async findAllAvailable(brand, category_id, name) {
    const cars = this.cars.filter(car => {
      if (car.available || brand && car.brand === brand || category_id && car.category_id === category_id || name && car.name === name) {
        return car;
      }

      return;
    });
    return cars;
  }

  async findById(id) {
    return this.cars.find(car => car.id === id);
  }

  async updateAvailable(id, available) {
    const index = this.cars.findIndex(car => car.id === id);
    console.log(available);
    this.cars[index].available = available;
  }

}

exports.CarsRepositoryInMemory = CarsRepositoryInMemory;