// server.js
import express from "express";
import cors from "cors";
import { askLLM } from "./llm.js";

const app = express();
app.use(cors());
app.use(express.json());

// POST /api/query
app.post("/api/query", async (req, res) => {
  try {
    const { query } = req.body;

    if (typeof query !== "string" || !query.trim()) {
      return res.status(400).json({ error: "Query must be a non-empty string" });
    }

    const response = await askLLM(query.trim());

    // Standard response format
    res.json({ summary: response });
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.error("❌ Error:", err.stack);
    } else {
      console.error("❌ Error:", err.message);
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
