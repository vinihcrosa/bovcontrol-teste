import { Request, Response } from "express";
import { ILogger } from "../../../logger/ILogger";
import { GetMilkProductionByMonthUseCase } from "./getMilkProduction.useCase";

export class GetMilkProductionByMonthController {
  constructor(
    private getMilkProductionByMonthUseCase: GetMilkProductionByMonthUseCase,
    private logger: ILogger
  ) {}

  public async handle(req: Request, res: Response) {
    const date = new Date(req.query.date as string);
    const farmerId = req.body.payload.id;

    this.logger.info(
      'getMilkProductionByMonthController',
      'handle',
      {
        date,
        farmerId
      }
    )
    

    try {
      const production = await this.getMilkProductionByMonthUseCase.execute(farmerId, date)
      res.status(200).json(production);
    } catch (error) {
      this.logger.error(
        'getMilkProductionByMonthController',
        'handle',
        error
      )
      res.status(400).json({ message: error.message });
    }
  }
}