import { IDailyMilkProduction } from "../../../entities/dailyMilkProduction.entity";
import { ILogger } from "../../../logger/ILogger";
import { IDailyMilkProductionRepository } from "../../../repositories/IDayliMilkProductionRepository";

export class GetMilkProductionByMonthUseCase {
  constructor(
    private readonly milkProductionRepository: IDailyMilkProductionRepository,
    private logger: ILogger  
  ) {}

  public async execute(farmerId: string, date: Date) {
    this.logger.info(
      'GetMilkProductionByMonthUseCase',
      `farmerId: ${farmerId}, date: ${date}`,
      {
        farmerId,
        date
      }
    );
    const milkProduction = await this.milkProductionRepository.findByFarmerIdAndMonth(farmerId, date);

    const mean = milkProduction.reduce((acc, curr) => acc + curr.quantity, 0) / milkProduction.length;

    return {
      production: milkProduction, 
      mean
    };
  }
}