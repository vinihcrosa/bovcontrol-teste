import { IsNumber, IsPositive, IsString } from "class-validator";

export class CreateFarmerDTO {
  @IsString()
  farmerName: string;

  @IsString()
  farmName: string;

  @IsString()
  password: string;

  @IsNumber()
  @IsPositive()
  distanceToFactory: number;
}