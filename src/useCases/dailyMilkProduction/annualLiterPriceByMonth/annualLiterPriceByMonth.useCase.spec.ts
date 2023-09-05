import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ILiterPriceByMonth, LiterPriceByMonth } from '../literPriceByMonth/literPriceByMonth.useCase';
import { AnnualLiterPriceByMonthUseCase } from './annualLiterPriceByMonth.useCase';
import { MockLogger } from '../../../logger/mock/mockLogger';
import { IPayload } from '../../../modules/authModule';

interface LocalTestContext {
  literPriceByMonthMock: ILiterPriceByMonth;
  annualLiterPriceByMonthUseCase: AnnualLiterPriceByMonthUseCase;
}

describe('Annual liter price by month use case', () => {
  beforeEach<LocalTestContext>((context) => {
    context.literPriceByMonthMock = {
      execute: vi.fn()
    }

    context.annualLiterPriceByMonthUseCase = new AnnualLiterPriceByMonthUseCase(
      context.literPriceByMonthMock,
      new MockLogger()
    )
  })

  it<LocalTestContext>('Should be defined', (context) => {
    expect(context.annualLiterPriceByMonthUseCase).toBeDefined();
  })

  it<LocalTestContext>('Should return the annual liter price by month', async (context) => {
    const payload: IPayload = {
      id: '123',
      distanceToFactory: 10,
      farmerName: 'John Doe',
      farmName: 'John Doe Farm'
    }

    const date = new Date(2021, 0);

    const price = {
      dolar: '$ 1.00',
      real: 'R$ 1,00'
    }

    vi.spyOn(context.literPriceByMonthMock, 'execute').mockResolvedValue(price);

    const res = await context.annualLiterPriceByMonthUseCase.execute(payload, date.getFullYear());

    expect(res).toEqual({
      1: price,
      2: price,
      3: price,
      4: price,
      5: price,
      6: price,
      7: price,
      8: price,
      9: price,
      10: price,
      11: price,
      12: price
    })
  })
})