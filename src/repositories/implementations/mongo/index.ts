import { FarmerRepository } from "./farmer.repository";
import { FarmerModel } from "./schemas/farmer.schema";

const farmerRepository = new FarmerRepository(FarmerModel);

export { farmerRepository };