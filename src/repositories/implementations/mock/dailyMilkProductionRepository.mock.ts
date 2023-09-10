import { vi } from "vitest";
import { IDailyMilkProductionRepository } from "../../IDayliMilkProductionRepository";

export const DailyMilkProductionRepositoryMock: IDailyMilkProductionRepository = {
  create: vi.fn(),
  findById: vi.fn(),
  findByFarmerAndDate: vi.fn(),
  findByFarmerId: vi.fn(),
  findByFarmerIdAndMonth: vi.fn(),
  findByFarmerIdAndYear: vi.fn(),
}