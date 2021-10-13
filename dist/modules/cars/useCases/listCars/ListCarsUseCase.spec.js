"use strict";

var _CarsRepositoryInMemory = require("../../repositories/in-memory/CarsRepositoryInMemory");

var _ListCarsUseCase = require("./ListCarsUseCase");

let listCarsUseCase;
let carsRepositoryInMemory;
describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    listCarsUseCase = new _ListCarsUseCase.ListCarsUseCase(carsRepositoryInMemory);
  });
  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Audi A2",
      description: "Carro com espaço",
      daily_rate: 115,
      license_plate: "FFF-2242",
      fine_amount: 120,
      brand: "Audi",
      category_id: "6bca43e0-fc1d-4e90-8568-6e0b7b1617ab"
    });
    const cars = await listCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Audi A3",
      description: "Carro com espaço",
      daily_rate: 115,
      license_plate: "FFF-2242",
      fine_amount: 120,
      brand: "Audi_test",
      category_id: "6bca43e0-fc1d-4e90-8568-6e0b7b1617ab"
    });
    const cars = await listCarsUseCase.execute({
      brand: "Audi_test"
    });
    expect(cars).toEqual([car]);
  });
});