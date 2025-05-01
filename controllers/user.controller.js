// user controller business logic with jwt
import User from "../models/User.js";
import { JWT_SECRET, JWT_EXPIRATION } from "../config/env.config.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Helper to sign JWT
const signToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  });
};

// ========== REGISTER  USER ==========
export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession(); // Mongoose transaction
  session.startTransaction();
  try {
    const { name, email, password, role } = req.body;

    // 1. Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // 2. Create user
    const user = new User({ name, email, password, role });
    await user.save({ session });

    // 3. Generate token
    const token = signToken(user._id);

    // 4. Commit transaction
    await session.commitTransaction();
    session.endSession();
    // 5. Send response
    res.status(201).json({
      success: true,
      message: "User created successfully",
      token,
      user: {
        id: user[0]._id,
        name: user[0].name,
        email: user[0].email,
        role: user[0].role,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

// ========== LOGIN USER ==========
export const signIn = async (req, res, next) => {
  try {
    // 1. Get user credentials
    const { email, password } = req.body;

    // 2. Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // 3. Compare password using bcrypt
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 4. Generate token
    const token = signToken(user._id);

    // 5. Send response
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};
