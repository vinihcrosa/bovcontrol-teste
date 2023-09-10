import { beforeEach, describe, expect, it, vi } from 'vitest';
import { CreateFarmerUseCase } from './createFarmer.useCase';
import { ILogger } from '../../../logger/ILogger';
import { MockLogger } from '../../../logger/mock/mockLogger';
import { IFarmerRepository } from '../../../repositories/IFarmerRepository';
import { Farmer, IFarmer } from '../../../entities/farmer.entity';
import { FarmerRepositoryMock } from '../../../repositories/implementations/mock/farmerRepository.mock';

interface LocalTestContext {
  createFarmerUSeCase: CreateFarmerUseCase;
  farmerRepository: IFarmerRepository;
}

describe('Create farmer use case', () => {
  beforeEach<LocalTestContext>(async (context) => {
    const logger: ILogger = new MockLogger();

    context.farmerRepository = FarmerRepositoryMock;
    
    context.createFarmerUSeCase = new CreateFarmerUseCase(context.farmerRepository, logger);
  })

  it<LocalTestContext>('Should be defined', (context) => {
    expect(context.createFarmerUSeCase).toBeDefined();
  })

  it<LocalTestContext>('Should create a new farmer', async (context) => {
    const farmer = new Farmer({
      id: '123',
      farmerName: 'John Doe',
      farmName: 'John Doe Farm',
      password: '123456',
      distanceToFactory: 10
    });

    vi.spyOn(context.farmerRepository, 'create').mockResolvedValueOnce(farmer)

    const newFarmer = await context.createFarmerUSeCase.execute(farmer);

    expect(newFarmer).toEqual(farmer.toJson());
  })
})