import { ILogger } from "../../../logger/ILogger";
import { IFarmerRepository } from "../../../repositories/IFarmerRepository";

export class GetFarmerUSeCase {
  constructor(
    private farmerRepository: IFarmerRepository,
    private logger: ILogger
  ) {}

  async execute(id: string) {
    this.logger.info(
      "getFarmerUseCase",
      "Getting a farmer",
      id
    );

    const farmer = await this.farmerRepository.findById(id);
    
    if(!farmer) {
      this.logger.info(
        "getFarmerUseCase",
        "Farmer not found",
        id
      )
      return null;
    }

    this.logger.info(
      "getFarmerUseCase",
      "Farmer found",
      id
    )
    
    return farmer.toJson();
  }
}