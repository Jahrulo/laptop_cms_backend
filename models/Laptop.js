import mongoose from "mongoose";
import { STATUS_ENUM } from "../constants/status.enum.js";

const laptopSchema = new mongoose.Schema({
  brand: { type: String, required: [true, "Brand name is required"] },
  model: { type: String, required: [true, "Model is required"] },
  serialNumber: {
    type: String,
    unique: true,
    required: [true, "Serial number is required"],
  },
  status: {
    type: String,
    enum: STATUS_ENUM,
    required: true,
  },
  purchaseDate: {
    type: String,
    required: [true, "Purchase data is required"],
  },
  notes: {
    type: String,
    required: [true, "Notes is required"],
  },
});

const Laptop = mongoose.model("Laptop", laptopSchema);

export default Laptop;
