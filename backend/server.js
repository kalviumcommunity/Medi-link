// server.js
import express from "express";
import cors from "cors";
import { askLLM } from "./llm.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/query", async (req, res) => {
  const { query } = req.body;
  try {
    const result = await askLLM(query);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(5000, () => console.log("✅ Server running on port 5000"));
