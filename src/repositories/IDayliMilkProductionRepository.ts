import { IDailyMilkProduction } from "../entities/dailyMilkProduction.entity";

export interface IDailyMilkProductionRepository {
  create(dailyMilkProduction: IDailyMilkProduction): Promise<IDailyMilkProduction>;

  findById(id: string): Promise<IDailyMilkProduction | undefined>;
  findByFarmerAndDate(farmerId: string, date: Date): Promise<IDailyMilkProduction | undefined>;
  findByFarmerId(farmerId: string): Promise<IDailyMilkProduction[]>;
  findByFarmerIdAndMonth(farmerId: string, date: Date): Promise<IDailyMilkProduction[]>;
  findByFarmerIdAndYear(farmerId: string, year: number): Promise<IDailyMilkProduction[]>;
}