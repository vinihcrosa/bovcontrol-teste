import { Request, Response, Router } from "express";
import { auth } from "../../modules/authModule";
import { createDailyMilkProductionController } from "./createDailyMilkProduction";

const dailyMilkProductionRoutes = Router();

dailyMilkProductionRoutes.post('/', auth, (request: Request, response: Response) => {
  createDailyMilkProductionController.handle(request, response);  
})

export { dailyMilkProductionRoutes }