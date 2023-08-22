import { pinoLogger } from "../../../logger/pinoLogger";
import { dailyMilkProductionRepository } from "../../../repositories/implementations/mongo";
import { LiterPriceByMonthController } from "./literPriceByMonth.controller";
import { LiterPriceByMonth } from "./literPriceByMonth.useCase";

const literPriceByMonth = new LiterPriceByMonth(
  dailyMilkProductionRepository,
  pinoLogger
)

const literPriceByMonthController = new LiterPriceByMonthController(
  literPriceByMonth,
  pinoLogger
)

export { literPriceByMonth, literPriceByMonthController }