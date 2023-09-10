import { beforeEach, describe, expect, it, vi } from 'vitest';
import { IDailyMilkProductionRepository } from '../../../repositories/IDayliMilkProductionRepository';
import { ILiterPriceByMonth, LiterPriceByMonth } from './literPriceByMonth.useCase';
import { DailyMilkProductionModel } from '../../../repositories/implementations/mongo/schemas/dailyMilkProduction.schema';
import { DailyMilkProductionRepositoryMock } from '../../../repositories/implementations/mock/dailyMilkProductionRepository.mock';
import { MockLogger } from '../../../logger/mock/mockLogger';
import { IDailyMilkProduction } from '../../../entities/dailyMilkProduction.entity';
import { IPayload } from '../../../modules/authModule';

interface LocalTestContext {
  dailyMilkProductionRepository: IDailyMilkProductionRepository
  literPriceByMonthUseCase: ILiterPriceByMonth
}

describe('Get liter price use case', () => {
  beforeEach<LocalTestContext>((context) => {
    context.dailyMilkProductionRepository = DailyMilkProductionRepositoryMock;

    context.literPriceByMonthUseCase = new LiterPriceByMonth(
      context.dailyMilkProductionRepository,
      new MockLogger()
    )
  })

  it<LocalTestContext>('Should be defined', (context) => {
    expect(context.literPriceByMonthUseCase).toBeDefined()
  })

  it<LocalTestContext>('Should get liter price', async (context) => {
    const dailyMilkProduction: IDailyMilkProduction = {
      quantity: 10,
      date: new Date(),
      farmerId: '1'
    }

    vi.spyOn(DailyMilkProductionModel, 'find').mockResolvedValueOnce([dailyMilkProduction])

    const payload: IPayload = {
      id: '1',
      distanceToFactory: 10,
      farmerName: 'Teste',
      farmName: 'Teste',
    }

    vi.spyOn(context.dailyMilkProductionRepository, 'findByFarmerIdAndMonth').mockResolvedValueOnce([dailyMilkProduction])

    const literPrice = await context.literPriceByMonthUseCase.execute(payload, new Date())

    expect(literPrice).toEqual({
      dolar: Intl.NumberFormat('us', { style: 'currency', currency: 'USD' }).format(1.91 / 5.5),
      real: Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(1.91)
    })
  })
})
