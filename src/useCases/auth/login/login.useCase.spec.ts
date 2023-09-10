import { beforeEach, describe, expect, it, vi } from 'vitest'
import { LoginUseCase } from './login.usecase'
import { IFarmerRepository } from '../../../repositories/IFarmerRepository'
import { FarmerRepositoryMock } from '../../../repositories/implementations/mock/farmerRepository.mock'
import { MockLogger } from '../../../logger/mock/mockLogger'
import { Farmer } from '../../../entities/farmer.entity'
import * as dotenv from 'dotenv'

interface LocalTestContext {
  loginUseCase: LoginUseCase
  farmerRepository: IFarmerRepository
}

describe('Login use case', () => {
  beforeEach<LocalTestContext>((context) => {
    dotenv.config()
    context.farmerRepository = FarmerRepositoryMock

    context.loginUseCase = new LoginUseCase(
      context.farmerRepository,
      new MockLogger()
    )
  })

  it<LocalTestContext>('Should be defined', (context) => {
    expect(context.loginUseCase).toBeDefined()
  })

  it<LocalTestContext>('Should login a farmer', async (context) => {
    const farmer = new Farmer({
      farmName: 'Teste',
      farmerName: 'Teste',
      distanceToFactory: 10,
      password: '123456'
    })

    farmer.id = '1'

    vi.spyOn(context.farmerRepository, 'findByName').mockResolvedValueOnce(farmer)

    vi.spyOn(farmer, 'checkPassword').mockReturnValueOnce(true)

    const sign = await context.loginUseCase.execute('', '');

    expect(sign).toBeDefined()
  })

  it<LocalTestContext>('Should not login a farmer', async (context) => {
    vi.spyOn(context.farmerRepository, 'findByName').mockResolvedValueOnce(undefined)

    const sign = await context.loginUseCase.execute('', '');

    expect(sign).toBeNull()
  })
})