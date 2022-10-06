import mongoose, { Schema, model, mongo } from "mongoose";
mongoose.pluralize(null);

interface Location {
  type: string;
  state: string;
  name: string;
}
const LocationSchema = new Schema<Location>(
  {
    type: {
      type: String,
      required: true,
      default: "Carro",
      enum: ["Carro", "Moto"],
    },
    state: {
      type: String,
      default: "1",
      required: true,
      enum: ["1", "2", "3"],
    },
    name: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);
export const LocationModel = model<Location>("Location", LocationSchema);
