import { BenchFactory, beforeEach, describe, expect, it, vi } from 'vitest';
import { CreateDailyMilkProductionUseCase } from './createDailyMilkProduction.useCase';
import { MockLogger } from '../../../logger/mock/mockLogger';
import { DailyMilkProductionRepositoryMock } from '../../../repositories/implementations/mock/dailyMilkProductionRepository.mock';
import { IDailyMilkProductionRepository } from '../../../repositories/IDayliMilkProductionRepository';
import { IDailyMilkProduction } from '../../../entities/dailyMilkProduction.entity';
import { CreateDailyMilkProductionDTO } from './createDailyMilkProduction.dto';

interface LocalTestContext {
  createDailyMilkProductionUseCase: CreateDailyMilkProductionUseCase;
  dailyMilkProductionRepositoryMock: IDailyMilkProductionRepository;
}

describe('Create daily milk production use case', () => {
  beforeEach<LocalTestContext>((context) => {

    context.dailyMilkProductionRepositoryMock = DailyMilkProductionRepositoryMock

    context.createDailyMilkProductionUseCase = new CreateDailyMilkProductionUseCase(
      context.dailyMilkProductionRepositoryMock,
      new MockLogger()
    )
  })

  it<LocalTestContext>('Should be defined', (context) => {
    expect(context.createDailyMilkProductionUseCase).toBeDefined()
  })

  it<LocalTestContext>('Should create daily milk production', async (context) => {
    const dailyMilkProduction: IDailyMilkProduction = {
      date: new Date(),
      farmerId: '1',
      quantity: 10
    }
    vi.spyOn(context.dailyMilkProductionRepositoryMock, 'create').mockResolvedValueOnce(dailyMilkProduction)
    vi.spyOn(context.dailyMilkProductionRepositoryMock, 'findByFarmerAndDate').mockResolvedValueOnce(undefined)

    const createDailyMilkProductionDTO: CreateDailyMilkProductionDTO = {
      date: dailyMilkProduction.date.toISOString(),
      farmerId: dailyMilkProduction.farmerId,
      quantity: dailyMilkProduction.quantity,
      factory: 'factory',
      distance: 10
    }

    const newDailyMilkProduction = await context.createDailyMilkProductionUseCase.execute(createDailyMilkProductionDTO)

    expect(newDailyMilkProduction).toEqual(dailyMilkProduction)
  })

  it<LocalTestContext>('Should not create daily milk production if already exists', async (context) => {
    const dailyMilkProduction: IDailyMilkProduction = {
      date: new Date(),
      farmerId: '1',
      quantity: 10
    }
    vi.spyOn(context.dailyMilkProductionRepositoryMock, 'create').mockResolvedValueOnce(dailyMilkProduction)
    vi.spyOn(context.dailyMilkProductionRepositoryMock, 'findByFarmerAndDate').mockResolvedValueOnce(dailyMilkProduction)

    const createDailyMilkProductionDTO: CreateDailyMilkProductionDTO = {
      date: dailyMilkProduction.date.toISOString(),
      farmerId: dailyMilkProduction.farmerId,
      quantity: dailyMilkProduction.quantity,
      factory: 'factory',
      distance: 10
    }


    expect(context.createDailyMilkProductionUseCase.execute(createDailyMilkProductionDTO)).rejects.toThrowError('Daily milk production already exists')

  })
})