import express from "express";
import { PORT, NODE_ENV } from "./config/env.config.js";
import connectToDatabase from "./config/database.config.js";
import notFoundMiddleware from "./middlewares/notFound.middleware.js";
import errorHandlerMiddleware from "./middlewares/error.middleware.js";
import authRouter from "./routes/user.route.js"; // Import the auth router
const app = express(); // instantiate express

// middlewares
app.use(express.json()); // parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // parse URL-encoded requests

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
      `✅ Server is up and running on http://localhost:${PORT} : in ${NODE_ENV} mode💥`
    );
  });
};

startServer();

export default app;
