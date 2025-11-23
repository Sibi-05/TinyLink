import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { LinkController } from "./controllers/linkController.js";
import linksRouter from "./routes/links.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Health Check (required)
app.get("/healthz", (req, res) => {
  return res.json({
    ok: true,
    version: "1.0",
    uptime: process.uptime(),
  });
});

// API Routes
app.use("/api/links", linksRouter);

// Redirect → GET /:code
app.get("/:code", LinkController.redirect);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
