"use strict";

var _AppError = require("../../../../shared/errors/AppError");

var _RentalsRepositoryInMemory = require("../../repositories/in-memory/RentalsRepositoryInMemory");

var _CreateRentalUseCase = require("./CreateRentalUseCase");

var _dayjs = _interopRequireDefault(require("dayjs"));

var _DayjsDateProvider = require("../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _CarsRepositoryInMemory = require("../../../../modules/cars/repositories/in-memory/CarsRepositoryInMemory");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let createRentalUseCase;
let rentalsRepositoryInMemory;
let dayJsDateProvider;
let carsRepositoryInMemory;
describe("Create Rental", () => {
  const dayAdd24Hours = (0, _dayjs.default)().add(1, "day").toDate();
  beforeEach(() => {
    dayJsDateProvider = new _DayjsDateProvider.DayjsDateProvider();
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    rentalsRepositoryInMemory = new _RentalsRepositoryInMemory.RentalsRepositoryInMemory();
    createRentalUseCase = new _CreateRentalUseCase.CreateRentalUseCase(rentalsRepositoryInMemory, dayJsDateProvider, carsRepositoryInMemory);
  });
  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "cartest",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand",
      id: "12345"
    });
    const rental = await createRentalUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: dayAdd24Hours
    });
    console.log(rental);
    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });
  it("should not be able to create a new rental if there is another open to the same user", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "1111",
      expected_return_date: dayAdd24Hours,
      user_id: "12345"
    });
    await expect(createRentalUseCase.execute({
      user_id: "12345",
      car_id: "121212",
      expected_return_date: dayAdd24Hours
    })).rejects.toEqual(new _AppError.AppError("You have an open rental", 400));
  });
  it("should not be able to create a new rental if there is another open to the same car", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "test",
      user_id: "12345",
      expected_return_date: dayAdd24Hours
    });
    expect(createRentalUseCase.execute({
      user_id: "123456666",
      car_id: "test",
      expected_return_date: dayAdd24Hours
    })).rejects.toEqual(new _AppError.AppError("Car is unavailable", 400));
  });
  it("should not be able to create a new rental with invalid return time", async () => {
    await expect(createRentalUseCase.execute({
      user_id: "12345",
      car_id: "test",
      expected_return_date: (0, _dayjs.default)().toDate()
    })).rejects.toEqual(new _AppError.AppError("Expected return date is in the past", 400));
  });
});