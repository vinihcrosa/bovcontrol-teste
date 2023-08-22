import { pinoLogger } from "../../../logger/pinoLogger";
import { farmerRepository } from "../../../repositories/implementations/mongo";
import { CreateFarmerController } from "./createFarmer.controller";
import { CreateFarmerUseCase } from "./createFarmer.useCase";

const createFarmerUseCase = new CreateFarmerUseCase(
  farmerRepository,
  pinoLogger
);

const createFarmerController = new CreateFarmerController(
  createFarmerUseCase,
  pinoLogger
);

export { createFarmerUseCase, createFarmerController };