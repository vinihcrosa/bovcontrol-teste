import { ILogger } from "../../../logger/ILogger";
import { IPayload, sign } from "../../../modules/authModule";
import { IFarmerRepository } from "../../../repositories/IFarmerRepository";
import { GetFarmerUSeCase } from "../../farmer/getFarmer/getFarmer.useCase";

export class LoginUseCase {
  constructor(
    private farmerRepository: IFarmerRepository,
    private logger: ILogger
  ) {}

  async execute(farmName: string, password: string) {
    this.logger.info(
      "loginUseCase",
      "Logging in a farmer",
      {
        farmName
      }
    );
    
    const farmer = await this.farmerRepository.findByName(farmName);

    if(!farmer) {
      this.logger.info(
        "loginUseCase",
        "Farmer not found",
        {
          farmName
        }
      )
      return null;
    }

    if(!farmer.checkPassword(password)) {
      this.logger.info(
        "loginUseCase",
        "Wrong password",
        {
          farmName
        }
      )
      return null;
    }

    this.logger.info(
      "loginUseCase",
      "Farmer logged in",
      farmer.toJson()
    )

    return sign(farmer.toJson() as IPayload);
  }
}