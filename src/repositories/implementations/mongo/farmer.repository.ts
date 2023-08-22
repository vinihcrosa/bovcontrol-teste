import mongoose, {} from 'mongoose'
import { IFarmerRepository } from '../../IFarmerRepository';
import { Farmer, IFarmer } from '../../../entities/farmer.entity';

export class FarmerRepository implements IFarmerRepository {

  constructor (
    private farmerModel: mongoose.Model<IFarmer>
  ) {}

  async create(farmer: IFarmer): Promise<Farmer> {
    const createdFarmer = await this.farmerModel.create(farmer);
    return new Farmer(createdFarmer);
  }

  async findById(id: string): Promise<Farmer | undefined> {
    const farmer = await this.farmerModel.findById(id);
    if(!farmer) return undefined;
    return new Farmer(farmer);
  }

  async findByName(farmerName: string): Promise<Farmer | undefined> {
    const farmer = await this.farmerModel.findOne({ farmerName });
    if(!farmer) return undefined;
    return new Farmer(farmer);
  }

  async list(): Promise<Farmer[]> {
    const farmers = await this.farmerModel.find();
    return farmers.map(farmer => new Farmer(farmer));
  }

  async update(farmer: Farmer): Promise<void> {
    const { id, ...props } = farmer.toJson();
    await this.farmerModel.updateOne({ _id: id }, props);
  }

  async delete(id: string): Promise<void> {
    this.farmerModel.deleteOne({ _id: id });
  }
}