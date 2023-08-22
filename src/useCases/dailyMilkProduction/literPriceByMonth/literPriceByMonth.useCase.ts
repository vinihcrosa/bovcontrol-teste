import numeral from "numeral";

import { ILogger } from "../../../logger/ILogger";
import { IPayload } from "../../../modules/authModule";
import { IDailyMilkProductionRepository } from "../../../repositories/IDayliMilkProductionRepository";

export class LiterPriceByMonth {
  constructor(
    private dailyMilkProductionRepository: IDailyMilkProductionRepository,
    private logger: ILogger
  ) {}

  public async execute({id: farmerId, distanceToFactory}: IPayload, date: Date) {
    this.logger.info(
      'LiterPriceByMonthUseCase',
      `farmerId: ${farmerId}, date: ${date}`,
      {
        farmerId,
        distanceToFactory,
        date
      }
    );

    const milkProduction = await this.dailyMilkProductionRepository.findByFarmerIdAndMonth(farmerId, date);

    const totalProduction = milkProduction.reduce((acc, curr) => acc + curr.quantity, 0);

    const basePrice = date.getMonth() <= 6 ? 1.8 : 1.95;
    const costByKmUpTo50 = 0.05;
    const costByKmOver50 = 0.06;
    const bonusPerLiter = 0.01;

    const dolar = 5.5;
    
    const totalCostByKm = distanceToFactory <= 50 ? distanceToFactory * costByKmUpTo50 : 50 * costByKmUpTo50 + (distanceToFactory - 50) * costByKmOver50;
    
    this.logger.info(
      'LiterPriceByMonthUseCase',
      'total production',
      {
        totalProduction,
        basePrice,
        costByKmUpTo50,
        costByKmOver50,
        bonusPerLiter,
        totalCostByKm
      }
    )


    const price = totalProduction < 0 ? 0 : totalProduction * basePrice - totalCostByKm + bonusPerLiter * totalProduction;

    return {
      dolar: numeral(price / dolar).format('$0,0.00'),
      real: numeral(price).format('R$0.0,00')
    }
  }
}