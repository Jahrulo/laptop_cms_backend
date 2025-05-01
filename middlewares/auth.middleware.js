import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.config.js";
import User from "../models/User.js";

// Middleware to authenticate user using JWT
// This middleware checks if the user is authenticated by verifying the JWT token
const Auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized. No token." });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password"); // Don't send password

    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    next();
  } catch (err) {
    next(err);
  }
};

export default Auth;
