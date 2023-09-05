import { describe, it, expect, beforeEach, vi } from 'vitest';
import { GetFarmerUSeCase } from './getFarmer.useCase';
import { IFarmerRepository } from '../../../repositories/IFarmerRepository';
import { ILogger } from '../../../logger/ILogger';
import { MockLogger } from '../../../logger/mock/mockLogger';
import { FarmerRepositoryMock } from '../../../repositories/implementations/mock/farmerRepository.mock';
import { Farmer } from '../../../entities/farmer.entity';

interface LocalTestContext {
  getFarmerUseCase: GetFarmerUSeCase;
  farmerRepository: IFarmerRepository;
}

describe('Get farmer use case', () => {
  beforeEach<LocalTestContext>((context) => {
    const logger: ILogger = new MockLogger();

    context.farmerRepository = FarmerRepositoryMock;

    context.getFarmerUseCase = new GetFarmerUSeCase(context.farmerRepository, logger);
  })

  it<LocalTestContext>('Should be defined', (context) => {
    expect(context.getFarmerUseCase).toBeDefined();
  })

  it<LocalTestContext>('Should get a farmer', async (context) => {
    const farmer = new Farmer({
      id: '123',
      farmerName: 'John Doe',
      farmName: 'John Doe Farm',
      password: '123456',
      distanceToFactory: 10
    })

    vi.spyOn(context.farmerRepository, 'findById').mockResolvedValueOnce(farmer);

    const newFarmer = await context.getFarmerUseCase.execute('123');

    expect(newFarmer).toEqual(farmer.toJson());
  })

  it<LocalTestContext>('Should not get a farmer', async (context) => {
    vi.spyOn(context.farmerRepository, 'findById').mockResolvedValueOnce(undefined);

    const newFarmer = await context.getFarmerUseCase.execute('123');

    expect(newFarmer).toBeNull();
  })
})