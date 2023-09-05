import { IFarmerRepository } from "../../IFarmerRepository";
import { vi } from "vitest";

export const FarmerRepositoryMock: IFarmerRepository = {
  create: vi.fn(),
  findById: vi.fn(),
  findByName: vi.fn(),
  list: vi.fn(),
  update: vi.fn(),
  delete: vi.fn()
}