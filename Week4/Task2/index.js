const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
app.use(express.json());

/**
 * Swagger Configuration
 */
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Simple API with Swagger",
      version: "1.0.0",
      description: "A simple API documentation example using Swagger UI",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./index.js"], // Path to the API docs
};

// Initialize Swagger Docs
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /hello:
 *   get:
 *     summary: Returns a greeting message
 *     description: This API returns a simple greeting.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Hello, world!"
 */
app.get("/hello", (req, res) => {
  res.json({ message: "Hello, world!" });
});

// Start Server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
  console.log("Swagger docs available at http://localhost:3000/api-docs");
});
