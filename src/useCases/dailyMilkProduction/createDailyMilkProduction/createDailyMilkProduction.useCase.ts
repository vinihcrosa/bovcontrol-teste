import { ILogger } from "../../../logger/ILogger";
import { IDailyMilkProductionRepository } from "../../../repositories/IDayliMilkProductionRepository";
import { CreateDailyMilkProductionDTO } from "./createDailyMilkProduction.dto";

export class CreateDailyMilkProductionUseCase {
  constructor(
    private dailyMilkProductionRepository: IDailyMilkProductionRepository,
    private logger: ILogger
  ){}

  async execute(data: CreateDailyMilkProductionDTO) {
    this.logger.info(
      'createDailyMilkProductionUseCase',
      'Starting use case',
      { data }
    )

    const date = new Date(data.date)

    const productionAlreadyExists = await this.dailyMilkProductionRepository.findByFarmerAndDate(
      data.farmerId,
      date
    )

    if(productionAlreadyExists) {
      this.logger.error(
        'createDailyMilkProductionUseCase',
        'Daily milk production already exists',
        { data }
      )
      throw new Error('Daily milk production already exists')
    }

    const dailyMilkProduction = await this.dailyMilkProductionRepository.create({
      ...data,
      date
    });

    this.logger.info(
      'createDailyMilkProductionUseCase',
      'Daily milk production created',
      { dailyMilkProduction }
    )

    return dailyMilkProduction;
  }
}