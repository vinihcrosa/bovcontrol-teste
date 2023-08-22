import { Request, Response } from "express";
import { ILogger } from "../../../logger/ILogger";
import { AnnualLiterPriceByMonthUseCase } from "./annualLiterPriceByMonth.useCase";

export class AnnualLiterPriceByMonthController {
  constructor(
    private annualLiterPriceByMonthUseCase: AnnualLiterPriceByMonthUseCase,
    private logger: ILogger
  ) {}

  public async handle(req: Request, res: Response) {
    const { year } = req.params;
    const { payload } = req.body;

    try {
      const result = await this.annualLiterPriceByMonthUseCase.execute(payload, Number(year));

      return res.status(200).json(result);
    } catch (error) {
      this.logger.error(
        'AnnualLiterPriceByMonthController',
        'handle',
        error
      );

      return res.status(500).json({
        message: error.message || 'Unexpected error.'
      })
    }
  }
}