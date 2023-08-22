import { ILogger } from "../../../logger/ILogger";
import { IFarmerRepository } from "../../../repositories/IFarmerRepository";
import { CreateFarmerDTO } from "./createFarmer.dto";

export class CreateFarmerUseCase {
  constructor(
    private farmerRepository: IFarmerRepository,
    private logger: ILogger
  ) {}

  async execute(createFarmerDto: CreateFarmerDTO) {
    this.logger.info(
      "createFarmerUseCase",
      "Creating a new farmer",
      createFarmerDto
    );

    const farmer = await this.farmerRepository.create(createFarmerDto);
    
    this.logger.info(
      "createFarmerUseCase",
      "New farmer created",
      createFarmerDto
    )
    
    return farmer.toJson();
  }
}