import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CreateDailyMilkProductionUseCase } from '../createDailyMilkProduction/createDailyMilkProduction.useCase';
import { IDailyMilkProductionRepository } from '../../../repositories/IDayliMilkProductionRepository';
import { DailyMilkProductionRepositoryMock } from '../../../repositories/implementations/mock/dailyMilkProductionRepository.mock';
import { MockLogger } from '../../../logger/mock/mockLogger';
import { IDailyMilkProduction } from '../../../entities/dailyMilkProduction.entity';
import { GetMilkProductionByMonthUseCase } from './getMilkProduction.useCase';

interface LocalTestContext {
  getMilkProductionByMonthUseCase: GetMilkProductionByMonthUseCase;
  milkProductionRepository: IDailyMilkProductionRepository;
}

describe('Get milk production by month use case', () => {
  beforeEach<LocalTestContext>((context) => {
    context.milkProductionRepository = DailyMilkProductionRepositoryMock;

    context.getMilkProductionByMonthUseCase = new GetMilkProductionByMonthUseCase(
      context.milkProductionRepository,
      new MockLogger()
    )
  })

  it<LocalTestContext>('Should be defined', (context) => {
    expect(context.getMilkProductionByMonthUseCase).toBeDefined()
  })

  it<LocalTestContext>('Should get milk production', async (context) => {
    const dailyMilkProduction: IDailyMilkProduction = {
      quantity: 10,
      date: new Date(),
      farmerId: '1'
    }

    vi.spyOn(context.milkProductionRepository, 'findByFarmerIdAndMonth').mockResolvedValueOnce([dailyMilkProduction])

    const milkProduction = await context.getMilkProductionByMonthUseCase.execute('1', new Date())

    expect(milkProduction).toEqual({
      production: [dailyMilkProduction],
      mean: 10
    })
  })
})