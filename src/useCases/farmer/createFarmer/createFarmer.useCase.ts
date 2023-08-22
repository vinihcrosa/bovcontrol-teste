import { Farmer, IFarmer } from "../../../entities/farmer.entity";
import { ILogger } from "../../../logger/ILogger";
import { IFarmerRepository } from "../../../repositories/IFarmerRepository";
import { CreateFarmerDTO } from "./createFarmer.dto";
import bcrypt from 'bcrypt';

export class CreateFarmerUseCase {
  constructor(
    private farmerRepository: IFarmerRepository,
    private logger: ILogger
  ) {}

  async execute(createFarmerDto: CreateFarmerDTO) {
    const {password, ...rest} = createFarmerDto;

    this.logger.info(
      "createFarmerUseCase",
      "Creating a new farmer",
      rest
    );

    const newFarmer: IFarmer = {
      ...rest,
      password: bcrypt.hashSync(password, 10)
    }

    const farmer = await this.farmerRepository.create(newFarmer);
    
    this.logger.info(
      "createFarmerUseCase",
      "New farmer created",
      farmer.toJson()
    )
    
    return farmer.toJson();
  }
}