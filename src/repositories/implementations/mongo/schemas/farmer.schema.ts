import { Schema, model } from "mongoose";
import { IFarmer } from "../../../../entities/farmer.entity";

export const farmerSchema = new Schema<IFarmer>({
  farmerName: {
    type: String,
    unique: true,
    required: true,
  },
  farmName: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
  }
})

export const FarmerModel = model<IFarmer>('Farmer', farmerSchema);