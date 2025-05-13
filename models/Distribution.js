import mongoose from "mongoose";

const distributionSchema = new mongoose.Schema(
  {
    laptopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Laptop",
      required: [true, "Laptop is required."],
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
      default: Date.now,
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
      enum: ["Distributed"],
      default: "Distributed",
    },
  },
  {
    timestamps: true,
    optimisticConcurrency: true, // Add this for conflict handling
  }
);

// Add hooks with retry logic
distributionSchema.post("save", async function (doc, next) {
  try {
    const Laptop = mongoose.model("Laptop");
    await retryOperation(async () => {
      await Laptop.findByIdAndUpdate(
        doc.laptopId,
        { status: "Distributed" },
        { session: doc.$session() }
      );
    });
    next();
  } catch (err) {
    next(err);
  }
});

// Helper function for retrying operations
async function retryOperation(operation, maxRetries = 3, delay = 100) {
  let lastError;
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (i < maxRetries - 1)
        await new Promise((res) => setTimeout(res, delay));
    }
  }
  throw lastError;
}

export default mongoose.model("Distribution", distributionSchema);
