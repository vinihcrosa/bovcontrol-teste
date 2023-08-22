import { Request, Response, Router } from "express";
import { createFarmerController } from "./createFarmer";

const farmerRoutes = Router();

farmerRoutes.post("/", (request: Request, response: Response) => {
  return createFarmerController.handle(request, response);
})

export { farmerRoutes }