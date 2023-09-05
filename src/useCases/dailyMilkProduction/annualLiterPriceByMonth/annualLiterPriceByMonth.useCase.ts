import { DailyMilkProduction } from "../../../entities/dailyMilkProduction.entity";
import { ILogger } from "../../../logger/ILogger";
import { IPayload } from "../../../modules/authModule";
import { IDailyMilkProductionRepository } from "../../../repositories/IDayliMilkProductionRepository";
import { DailyMilkProductionRepository } from "../../../repositories/implementations/mongo/dailyMilkProduction.respository";
import { ILiterPriceByMonth, LiterPriceByMonth } from "../literPriceByMonth/literPriceByMonth.useCase";

export class AnnualLiterPriceByMonthUseCase {
  constructor(
    private literPriceByMonth: ILiterPriceByMonth,
    private logger: ILogger
  ) {}

  public async execute(payload: IPayload, year: number) {
    
    const res: any = {};
    
    for(let month = 0; month < 12; month++) {
      const date = new Date(year, month);
      
      const price = await this.literPriceByMonth.execute(payload, date);

      console.log(date, price);

      res[month + 1] = price;
    }

    return res;
  }
}