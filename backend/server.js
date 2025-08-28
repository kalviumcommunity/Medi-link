// server.js
import express from "express";
import cors from "cors";
import { handleLLM } from "./llm.js";   // ✅ not askLLM

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/query", async (req, res) => {
  const { query } = req.body;
  const response = await handleLLM(query);  // ✅ use handleLLM
  res.json(response);
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
