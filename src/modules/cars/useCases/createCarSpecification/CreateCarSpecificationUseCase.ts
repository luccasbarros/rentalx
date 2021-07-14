import { AppError } from "../../../../shared/errors/AppError";
import { inject } from "tsyringe";
import { ICarsRepository } from "../../repositories/ICarsRepository";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({ car_id, specifications_id }: IRequest): Promise<void> {
    const carExists = await this.carsRepository.findById(car_id);

    if (!carExists) {
      throw new AppError(`Car with id ${car_id} does not exist`, 400);
    }
  }
}

export { CreateCarSpecificationUseCase };
