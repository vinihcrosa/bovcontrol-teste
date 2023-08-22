import { DailyMilkProductionRepository } from "./dailyMilkProduction.respository";
import { FarmerRepository } from "./farmer.repository";
import { DailyMilkProductionModel } from "./schemas/dailyMilkProduction.schema";
import { FarmerModel } from "./schemas/farmer.schema";

const farmerRepository = new FarmerRepository(FarmerModel);

const dailyMilkProductionRepository = new DailyMilkProductionRepository(DailyMilkProductionModel);

export { farmerRepository, dailyMilkProductionRepository };