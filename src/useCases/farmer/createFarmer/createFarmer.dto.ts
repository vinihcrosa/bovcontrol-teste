import { IsString } from "class-validator";

export class CreateFarmerDTO {
  @IsString()
  farmerName: string;

  @IsString()
  farmName: string;

  @IsString()
  password: string;
}