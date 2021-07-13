import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });
  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Audi A2",
      description: "Carro com espaço",
      daily_rate: 110,
      license_plate: "DEF-2232",
      fine_amount: 40,
      brand: "Audi",
      category_id: "categoryid",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Audi A2",
      description: "Carro com espaço",
      daily_rate: 110,
      license_plate: "DEF-2232",
      fine_amount: 40,
      brand: "Car_Brand_test",
      category_id: "categoryid",
    });

    const cars = await listAvailableCarsUseCase.execute({ brand: "Car_Brand_test" });

    expect(cars).toEqual([car]);
  });

    it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      description: "Carro com espaço",
      daily_rate: 110,
      license_plate: "DEF-2234",
      fine_amount: 40,
      brand: "Car_Brand_test",
      category_id: "categoryid",
    });

    const cars = await listAvailableCarsUseCase.execute({ name: "Car3" });

    expect(cars).toEqual([car]);
  });

      it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car4",
      description: "Carro com espaço",
      daily_rate: 110,
      license_plate: "DEF-22334",
      fine_amount: 40,
      brand: "Car_Brand_test",
      category_id: "12345",
    });

    const cars = await listAvailableCarsUseCase.execute({ category_id: "12345" });

    expect(cars).toEqual([car]);
  });
});
