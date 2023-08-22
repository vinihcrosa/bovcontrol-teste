import mongoose, { Schema } from "mongoose";
import { IDailyMilkProduction } from "../../../../entities/dailyMilkProduction.entity";

export const dailyMilkProductionSchema = new Schema<IDailyMilkProduction>({
  quantity: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  farmerId: {
    type: String,
    required: true,
    ref: 'Farmer',
  },
  factory: {
    type: String,
  },
  distance: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  }
})

export const DailyMilkProductionModel = mongoose.model<IDailyMilkProduction>('DailyMilkProduction', dailyMilkProductionSchema);