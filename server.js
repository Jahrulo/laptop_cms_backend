import express from "express";
import { PORT, NODE_ENV } from "./config/env.config.js";
import connectToDatabase from "./config/database.config.js";
const app = express(); // instantiate express

// root route
app.get("/", (req, res) => {
  res.send("😻Yayyyy api is working");
});

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
