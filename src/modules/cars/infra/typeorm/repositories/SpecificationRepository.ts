import { ICreateSpecificationDTO, ISpecificationsRepository } from "src/modules/cars/repositories/ISpecificationRepository";
import { getRepository, Repository } from "typeorm";
import { Specification } from "../entities/Specification";


class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }
  async create({ description, name }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({
      description,
      name,
    });

    await this.repository.save(specification);
  }

  async findByName(name: string) {
    const specification = this.repository.findOne({
      name,
    });
    return specification;
  }
}

export { SpecificationsRepository };
