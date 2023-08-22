import { Request, Response } from "express";
import { ILogger } from "../../../logger/ILogger";
import { CreateDailyMilkProductionDTO } from "./createDailyMilkProduction.dto";
import { CreateDailyMilkProductionUseCase } from "./createDailyMilkProduction.useCase";
import { validate } from "class-validator";

export class CreateDailyMilkProductionController {
  constructor(
    private createDailyMilkProductionUseCase: CreateDailyMilkProductionUseCase,
    private logger: ILogger
  ){}

  async handle(request: Request, response: Response) {
    this.logger.info(
      'DailyMilkProductionController',
      'Starting controller',
      { body: request.body }
    )

    const {
      date,
      quantity,
      factory,
      distance,
    } = request.body;

    const data: CreateDailyMilkProductionDTO = {
      date,
      quantity,
      factory,
      distance,
      farmerId: request.body.payload.id
    }

    try {
      validate(data)

      const dailyMilkProduction = await this.createDailyMilkProductionUseCase.execute(data);

      this.logger.info(
        'DailyMilkProductionController',
        'Daily milk production created',
        { dailyMilkProduction }
      )

      return response.status(201).json(dailyMilkProduction);
    } catch (error) {
      this.logger.error(
        'DailyMilkProductionController',
        'Error creating daily milk production',
        { error }
      )

      return response.status(400).json({
        message: error.message || 'Unexpected error.'
      })
    }
  }
}