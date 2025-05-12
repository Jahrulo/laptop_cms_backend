import mongoose from "mongoose";

const distributionSchema = new mongoose.Schema(
  {
    laptopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Laptop", // Reference to the Laptop model
      required: [true, "Laptop  is required."],
    },
    recipientName: {
      type: String,
      required: [true, "Recipient's name is required."],
    },
    recipientEmail: {
      type: String,
      required: [true, "Recipient's email is required."],
      unique: true,
      match: [/.+@.+\..+/, "Please enter a valid email address."],
    },
    recipientPhone: {
      type: String,
      required: [true, "Recipient's phone number is required."],
      unique: true,
    },
    dateDistributed: {
      type: Date,
      required: [true, "Distribution date is required."],
    },
    expectedReturnDate: {
      type: Date,
      required: [true, "Expected return date is required."],
    },
    dateReturned: {
      type: Date,
      default: null,
    },
    notes: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const distribution = mongoose.model("Distribution", distributionSchema);

export default distribution;
