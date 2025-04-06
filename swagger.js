const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Personal Finance Tracker API",
      version: "1.0.0",
    },
    tags: [
      { name: "Users", description: "User management" },
      { name: "Expenses", description: "User's expenses" },
      { name: "Budgets", description: "User's budgets" },
      { name: "Scores", description: "User's financial scores" },
      { name: "Reversals", description: "User's reversals" },
    ],
    servers: [{ url: "http://localhost:5000" }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js", "./controller/*.js"],
};


const swaggerSpec = swaggerJsDoc(options);

module.exports = { swaggerUi, swaggerSpec };
