import { v4 as uuidv4 } from "uuid";
import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm";

@Entity("users")
class Car {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  daily_rate: number;
  available: boolean;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
  created_at: Date;
}

export { Car };
