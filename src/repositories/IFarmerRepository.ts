import { Farmer, IFarmer } from "../entities/farmer.entity";

export interface IFarmerRepository {
  create(farmer: IFarmer): Promise<Farmer>;

  findById(id: string): Promise<Farmer | undefined>;
  findByName(farmerName: string): Promise<Farmer | undefined>;

  list(): Promise<Farmer[]>;

  update(farmer: Farmer): Promise<void>;

  delete(id: string): Promise<void>;
}