import { IDailyMilkProduction } from "../../../entities/dailyMilkProduction.entity";
import { ILogger } from "../../../logger/ILogger";
import { IDailyMilkProductionRepository } from "../../../repositories/IDayliMilkProductionRepository";

export class GetMilkProductionByMonthUseCase {
  constructor(
    private readonly milkProductionRepository: IDailyMilkProductionRepository,
    private logger: ILogger  
  ) {}

  public async execute(farmerId: string, date: Date): Promise<IDailyMilkProduction[]> {
    this.logger.info(
      'GetMilkProductionByMonthUseCase',
      `farmerId: ${farmerId}, date: ${date}`,
      {
        farmerId,
        date
      }
    );
    const milkProduction = await this.milkProductionRepository.findByFarmerIdAndMonth(farmerId, date);

    return milkProduction;
  }
}