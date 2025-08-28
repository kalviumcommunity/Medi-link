// server.js
import express from "express";
import cors from "cors";
import { askLLM } from "./llm.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post("/api/query", async (req, res) => {
  try {
    const { query } = req.body;
    if (!query || typeof query !== "string") {
      return res.status(400).json({ error: "Query must be a string" });
    }

    const response = await askLLM(query);
    res.json({ summary: response });
  } catch (err) {
    console.error("❌ Error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
