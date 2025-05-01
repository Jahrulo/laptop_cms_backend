/* eslint-disable no-unused-vars */
// global error handler

const errorHandlerMiddleware = (err, _, res, next) => {
  // Log the error to the console
  console.error("🚨 Error found: ", err);

  // set default error message with status code
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // -----------------------------
  // 1. Mongoose Validation Errors
  // -----------------------------
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors).map((val) => val.message);
  }
  // -----------------------------
  // 2. Duplicate Key Error (e.g. duplicate email)
  // -----------------------------
  if (err.code && err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue);
    message = `Duplicate field value: ${field}. Please use another value.`;
  }
  // -----------------------------
  // 3. Cast Error (e.g. invalid MongoDB ObjectId)
  // -----------------------------
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }
  // -----------------------------
  // Send Error Response
  // -----------------------------
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
};

export default errorHandlerMiddleware;
