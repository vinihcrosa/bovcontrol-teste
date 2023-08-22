import { pinoLogger } from "../../../logger/pinoLogger";
import { farmerRepository } from "../../../repositories/implementations/mongo";
import { GetFarmerController } from "./getFarmer.controller";
import { GetFarmerUSeCase } from "./getFarmer.useCase";

const getFarmerUseCase = new GetFarmerUSeCase(farmerRepository, pinoLogger);
const getFarmerController = new GetFarmerController(getFarmerUseCase, pinoLogger);

export { getFarmerUseCase, getFarmerController };