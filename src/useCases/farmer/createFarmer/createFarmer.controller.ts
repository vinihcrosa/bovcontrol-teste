import { Request, Response } from "express";
import { CreateFarmerDTO } from "./createFarmer.dto";
import { CreateFarmerUseCase } from "./createFarmer.useCase";
import { validate } from "class-validator";
import { ILogger } from "../../../logger/ILogger";

export class CreateFarmerController {
  constructor(
    private createFarmerUseCase: CreateFarmerUseCase,
    private logger: ILogger
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    this.logger.info(
      "createFarmerController",
      "Creating a new farmer",
      request.body
    )
    const createFarmerDto: CreateFarmerDTO = request.body;

    try {
      validate(createFarmerDto)
    } catch (error) {
      this.logger.error(
        "createFarmerController",
        "Validation error",
        error
      )
      return response.status(400).json({
        message: error.message || "Unexpected error."
      })
    }

    try {
      const farmer = await this.createFarmerUseCase.execute(createFarmerDto);

      return response.status(201).json(farmer);
    } catch (error) {
      return response.status(400).json({
        message: error.message || "Unexpected error."
      });
    }
  }
}