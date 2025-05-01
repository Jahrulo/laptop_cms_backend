/* eslint-disable no-undef */
// mongodb connection
import mongoose from "mongoose";
import { DATABASE_URL } from "./env.config.js";

const connectToDatabase = async () => {
  // Check if DATABASE_URL is defined
  if (!DATABASE_URL) {
    console.error(
      "❌ DATABASE_URL is not defined in the environment variables."
    );
    process.exit(1); // Exit the app if DATABASE_URL is not defined
  }
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("✅ Connected to MongoDB successfully!");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); // Exit the app if DB connection fails
  }
};

export default connectToDatabase;
