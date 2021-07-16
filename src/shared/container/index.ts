import { container } from "tsyringe";
import { UsersRepository } from "../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "../../modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { ISpecificationsRepository } from "../../modules/cars/repositories/ISpecificationRepository";
import { SpecificationsRepository } from "../../modules/cars/infra/typeorm/repositories/SpecificationRepository";
import { ICarsRepository } from "../../modules/cars/repositories/ICarsRepository";
import { CarsRepository } from "../../modules/cars/infra/typeorm/repositories/CarsRepository";
import { ICarsImageRepository } from "../../modules/cars/repositories/ICarsImagesRepository";
import { CarsImagesRepository } from "../../modules/cars/infra/typeorm/repositories/CarsImageRepository";

// ICategoriesRepository

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  "SpecificationsRepository",
  SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);

container.registerSingleton<ICarsImageRepository>(
  "CarsImageRepository",
  CarsImagesRepository
);
