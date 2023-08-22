import { pinoLogger } from "../../../logger/pinoLogger";
import { literPriceByMonth } from "../literPriceByMonth";
import { AnnualLiterPriceByMonthController } from "./annualLiterPriceByMonth.controller";
import { AnnualLiterPriceByMonthUseCase } from "./annualLiterPriceByMonth.useCase";

const annualLiterPriceByMonthUseCase = new AnnualLiterPriceByMonthUseCase(
  literPriceByMonth,
  pinoLogger
)

const annualLiterPriceByMonthController = new AnnualLiterPriceByMonthController(
  annualLiterPriceByMonthUseCase,
  pinoLogger
)

export { annualLiterPriceByMonthController }