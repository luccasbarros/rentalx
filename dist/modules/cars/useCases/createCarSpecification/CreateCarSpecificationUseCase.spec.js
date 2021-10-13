"use strict";

var _AppError = require("../../../../shared/errors/AppError");

var _CarsRepositoryInMemory = require("../../repositories/in-memory/CarsRepositoryInMemory");

var _SpecificationRepositoryInMemory = require("../../repositories/in-memory/SpecificationRepositoryInMemory");

var _CreateCarSpecificationUseCase = require("./CreateCarSpecificationUseCase");

let createCarSpecificationUseCase;
let carsRepositoryInMemory;
let specificationsRepositoryInMemory;
describe("Create car specification", () => {
  beforeEach(() => {
    specificationsRepositoryInMemory = new _SpecificationRepositoryInMemory.SpecificationRepositoryInMemory();
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    createCarSpecificationUseCase = new _CreateCarSpecificationUseCase.CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
  });
  it("should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Ferrari",
      description: "The best car",
      daily_rate: 1000,
      license_plate: "AB1234",
      fine_amount: 0,
      brand: "Ferrari",
      category_id: "category"
    });
    const specification = await specificationsRepositoryInMemory.create({
      description: "The best specification",
      name: "Best specification"
    });
    const specifications_id = [specification.id];
    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id
    });
    expect(specificationsCars).toHaveProperty("specifications");
    expect(specificationsCars.specifications.length).toBe(1);
  });
  it("should not be able to add a new specification to a non-existent car", async () => {
    const car_id = "1234";
    const specifications_id = ["54321"];
    expect(createCarSpecificationUseCase.execute({
      car_id,
      specifications_id
    })).rejects.toEqual(new _AppError.AppError(`Car with id ${car_id} does not exist`, 400));
  });
});