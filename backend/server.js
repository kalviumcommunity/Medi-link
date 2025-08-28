// server.js
import express from "express";
import cors from "cors";
import { askLLM } from "./llm.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/query", async (req, res) => {
  const { query } = req.body;

  if (!query || !query.trim()) {
    return res
      .status(400)
      .json({ error: "Query must be a non-empty string" });
  }

  try {
    const result = await askLLM(query.trim());
    res.json(result);
  } catch {
    res.status(500).json({
      summary: "Something went wrong while processing.",
      riskLevel: "unknown",
      nextSteps: []
    });
  }
});

app.listen(5000, () => {
  console.log("✅ Structured Output API running on http://localhost:5000");
});
