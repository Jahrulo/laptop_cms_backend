import express from "express";

const app = express(); // instantiate express

const Port = 3000; // port number

// root route
app.get("/", (req, res) => {
  res.send("😻Yayyyy api is working");
});

// start the server and listen on the specified port
const startServer = () => {
  app.listen(Port, () => {
    console.log(
      `✅Server is up and running on http://localhost:${Port} and on port ${Port} 💥`
    );
  });
};

startServer();

export default app;
