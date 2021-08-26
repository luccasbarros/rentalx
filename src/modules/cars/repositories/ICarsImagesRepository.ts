import { CarImage } from "../infra/typeorm/entities/CarImage";

interface ICarsImageRepository {
  create(card_id: string, image_name: string): Promise<CarImage>;
}

export { ICarsImageRepository };
