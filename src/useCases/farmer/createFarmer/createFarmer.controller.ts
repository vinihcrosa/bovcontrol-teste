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
    const { password, ...rest } = request.body;
    this.logger.info(
      "createFarmerController",
      "Creating a new farmer",
      rest
    )
    const createFarmerDto: CreateFarmerDTO = request.body;
    console.log(createFarmerDto)
    try {
      await validate(createFarmerDto)
      const farmer = await this.createFarmerUseCase.execute(createFarmerDto);

      return response.status(201).json(farmer);
    } catch (error) {
      this.logger.error(
        "createFarmerController",
        "Error while creating a new farmer",
        error
      )

      return response.status(400).json({
        message: error.message || "Unexpected error."
      });
    }
  }
}