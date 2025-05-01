// users model with validation
import mongoose from "mongoose";

// Create a schema for the user and define the structure of the user document
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Name is required"],
    trim: true,
    minLength: [3, "Name must be at least 3 characters"],
    maxLenghth: [30, "Name must be at most 30 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [6, "Password must be at least 6 characters"],
    maxLength: [20, "Password must be at most 20 characters"],
  },
  role: {
    type: String,
    enum: ["Admin", "Facilitator"],
  },
  Timestamp: true,
});

// Create a model for the user
const User = mongoose.model("User", userSchema);

// Export the user model
export default User;
