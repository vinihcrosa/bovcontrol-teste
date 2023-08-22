import { IsDateString, IsDecimal, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateDailyMilkProductionDTO {
  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsDateString()
  date: string;

  @IsString()
  farmerId: string;

  @IsString()
  factory: string;

  @IsNumber()
  @IsPositive()
  distance: number;
}