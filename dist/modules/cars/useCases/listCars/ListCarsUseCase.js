"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCarsUseCase = void 0;

class ListCarsUseCase {
  constructor(carsRepository) {
    this.carsRepository = carsRepository;
  }

  async execute({
    category_id,
    brand,
    name
  }) {
    const cars = await this.carsRepository.findAllAvailable(brand, category_id, name);
    return cars;
  }

}

exports.ListCarsUseCase = ListCarsUseCase;