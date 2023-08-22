import { Request, Response } from "express";
import { ILogger } from "../../../logger/ILogger";
import { GetFarmerUSeCase } from "./getFarmer.useCase";

export class GetFarmerController {
  constructor(
    private getFarmerUseCase: GetFarmerUSeCase, 
    private logger: ILogger
  ) {}
  
  async handle(request: Request, response: Response) {
    try {
      const { id } = request.body.payload;
      this.logger.info("getFarmerController", "Getting a farmer", id);
      const farmer = await this.getFarmerUseCase.execute(id);
      if (!farmer) {
        this.logger.info("getFarmerController", "Farmer not found", id);
        return response.status(404).send({ message: "Farmer not found" });
      }
      this.logger.info("getFarmerController", "Farmer found", id);
      return response.status(200).send(farmer);
    } catch (error) {
      this.logger.error("getFarmerController", "Error while getting a farmer", error);
      return response.status(500).send({ message: "Internal Server Error" });
    }
  }
}