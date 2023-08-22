import { pinoLogger } from "../../../logger/pinoLogger";
import { dailyMilkProductionRepository } from "../../../repositories/implementations/mongo";
import { GetMilkProductionByMonthController } from "./getMilkProduction.controller";
import { GetMilkProductionByMonthUseCase } from "./getMilkProduction.useCase";

const getMilkProductionByMonthUseCase = new GetMilkProductionByMonthUseCase(
  dailyMilkProductionRepository,
  pinoLogger
);

const getMilkProductionByMonthController = new GetMilkProductionByMonthController(
  getMilkProductionByMonthUseCase,
  pinoLogger
);

export { getMilkProductionByMonthController, getMilkProductionByMonthUseCase };