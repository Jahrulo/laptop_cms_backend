/* eslint-disable no-undef */
import express from "express";
import { PORT, NODE_ENV } from "./config/env.config.js";
import connectToDatabase from "./config/database.config.js";
import notFoundMiddleware from "./middlewares/notFound.middleware.js";
import errorHandlerMiddleware from "./middlewares/error.middleware.js";
import authRouter from "./routes/user.route.js"; // Import the auth router
import cookieParser from "cookie-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { swaggerOptions } from "./docs/swagger.config.js";

const app = express(); // instantiate express

app.use(cookieParser());

// Enable CORS for origins from the environment variable
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || ["*"];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,

    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    
  })
);

// middlewares
app.use(express.json()); // parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // parse URL-encoded requests


const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// routes endpoints
app.use("/api/v1/auth", authRouter);

// root route
app.get("/", (req, res) => {
  res.send("😻Yayyyy api is working");
});

// 404 handler (should come before the error middleware)
app.use(notFoundMiddleware);
// Global error handler (should be the last middleware)
app.use(errorHandlerMiddleware);

// start the server and listen on the specified port
const startServer = async () => {
  await connectToDatabase();

  app.listen(PORT, () => {
    console.log(
      `✅ Server is up and running on http://localhost:${PORT} : in ${NODE_ENV} mode💥 `
    );
    console.log(
      `🚀 API Docs are available at http://localhost:${PORT}/api-docs`
    );
  });
};

startServer();

export default app;
