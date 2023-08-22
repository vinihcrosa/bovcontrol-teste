import { pinoLogger } from "../../../logger/pinoLogger";
import { dailyMilkProductionRepository } from "../../../repositories/implementations/mongo";
import { CreateFarmerController } from "../../farmer/createFarmer/createFarmer.controller";
import { CreateFarmerUseCase } from "../../farmer/createFarmer/createFarmer.useCase";
import { CreateDailyMilkProductionController } from "./createDailyMilkProduction.controller";
import { CreateDailyMilkProductionUseCase } from "./createDailyMilkProduction.useCase";

const createDailyMilkProductionUseCase = new CreateDailyMilkProductionUseCase(
  dailyMilkProductionRepository,
  pinoLogger
)

const createDailyMilkProductionController = new CreateDailyMilkProductionController(
  createDailyMilkProductionUseCase,
  pinoLogger
)

export { createDailyMilkProductionUseCase, createDailyMilkProductionController }