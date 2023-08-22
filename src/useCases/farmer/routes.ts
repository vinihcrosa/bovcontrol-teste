import { Request, Response, Router } from "express";
import { createFarmerController } from "./createFarmer";
import { getFarmerController } from "./getFarmer";
import { auth } from "../../modules/authModule";

const farmerRoutes = Router();

farmerRoutes.post("/", (request: Request, response: Response) => {
  return createFarmerController.handle(request, response);
})

farmerRoutes.get("/",  auth, (request: Request, response: Response) => {
  return getFarmerController.handle(request, response);  
})

export { farmerRoutes }