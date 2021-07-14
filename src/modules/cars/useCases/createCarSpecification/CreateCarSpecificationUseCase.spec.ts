import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create car specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory
    );
  });
  it("should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Ferrari",
      description: "The best car",
      daily_rate: 1000,
      license_plate: "AB1234",
      fine_amount: 0,
      brand: "Ferrari",
      category_id: "category",
    });
    const specifications_id = ["54321"];
    await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });
  });

  it("should not be able to add a new specification to a non-existent car", async () => {
    expect(async () => {
      const car_id = "1234";
      const specifications_id = ["54321"];
      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
