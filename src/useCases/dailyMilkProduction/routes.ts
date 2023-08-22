import { Request, Response, Router } from "express";
import { auth } from "../../modules/authModule";
import { createDailyMilkProductionController } from "./createDailyMilkProduction";
import { getMilkProductionByMonthController } from "./getMilkProductionByMonth";
import { literPriceByMonthController } from "./literPriceByMonth";
import { annualLiterPriceByMonthController } from "./annualLiterPriceByMonth";

const dailyMilkProductionRoutes = Router();

dailyMilkProductionRoutes.post('/', auth, (request: Request, response: Response) => {
  createDailyMilkProductionController.handle(request, response);  
})

dailyMilkProductionRoutes.get('/month', auth, (request: Request, response: Response) => {
  getMilkProductionByMonthController.handle(request, response);
})

dailyMilkProductionRoutes.get('/price-per-month', auth, (request: Request, response: Response) => {
  literPriceByMonthController.handle(request, response);
})

dailyMilkProductionRoutes.get('/price-per-month/:year', auth, (request: Request, response: Response) => {
  annualLiterPriceByMonthController.handle(request, response);
})

export { dailyMilkProductionRoutes }