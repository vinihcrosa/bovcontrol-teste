import { Request, Response } from "express";
import { ILogger } from "../../../logger/ILogger";
import { LiterPriceByMonth } from "./literPriceByMonth.useCase";

export class LiterPriceByMonthController {
  constructor(
    private literPriceByMonth: LiterPriceByMonth,
    private logger: ILogger
  ) {}

  public async handle(req: Request, res: Response) {
    try {
      const date = new Date(req.query.date as string);
      const {payload} = req.body;

      this.logger.info(
        'LiterPriceByMonthController',
        'handle',
        {
          date,
          payload
        }
      )

      const price = await this.literPriceByMonth.execute(payload, date)

      res.status(200).json(price);
    } catch(error){
      this.logger.error(
        'LiterPriceByMonthController',
        'handle',
        error
      )
      res.status(400).json({ message: error.message });
    }
  }
}