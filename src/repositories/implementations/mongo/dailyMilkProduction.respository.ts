import mongoose from "mongoose";
import { IDailyMilkProduction } from "../../../entities/dailyMilkProduction.entity";
import { IDailyMilkProductionRepository } from "../../IDayliMilkProductionRepository";

export class DailyMilkProductionRepository implements IDailyMilkProductionRepository {
  constructor(
    private dailyMilkProductionModel: mongoose.Model<IDailyMilkProduction>
  ) {}

create(dailyMilkProduction: IDailyMilkProduction): Promise<IDailyMilkProduction> {
  return this.dailyMilkProductionModel.create(dailyMilkProduction);
}

async findById(id: string): Promise<IDailyMilkProduction | undefined> {
  const production = await this.dailyMilkProductionModel.findById(id);
  if(!production) return undefined;
  
  return production;
}

async findByFarmerAndDate(farmerId: string, date: Date): Promise<IDailyMilkProduction | undefined> {
  throw new Error("Method not implemented.");
}

  findByFarmerId(farmerId: string): Promise<IDailyMilkProduction[]> {
    throw new Error("Method not implemented.");
  }
  findByFarmerIdAndYear(farmerId: string, year: number): Promise<IDailyMilkProduction[]> {
    throw new Error("Method not implemented.");
  }
  
}
