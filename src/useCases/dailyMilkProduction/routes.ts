import { Request, Response, Router } from "express";
import { auth } from "../../modules/authModule";
import { createDailyMilkProductionController } from "./createDailyMilkProduction";
import { get } from "mongoose";
import { getMilkProductionByMonthController } from "./getMilkProductionByMonth";

const dailyMilkProductionRoutes = Router();

dailyMilkProductionRoutes.post('/', auth, (request: Request, response: Response) => {
  createDailyMilkProductionController.handle(request, response);  
})

dailyMilkProductionRoutes.get('/month', auth, (request: Request, response: Response) => {
  getMilkProductionByMonthController.handle(request, response);
})

export { dailyMilkProductionRoutes }