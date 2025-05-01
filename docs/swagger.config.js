
// swagger.config.js
export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Laptop CMS",
      version: "1.0.0",
      description: "API documentation for Laptop CMS",
    },
    servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],
  },
  apis: ["./routes/*.js"], // Path to the route files with Swagger comments
};
