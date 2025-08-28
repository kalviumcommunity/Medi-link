import express from "express";
import cors from "cors";
import { askLLM } from "./llm.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/query", async (req, res) => {
  const { query } = req.body;
  if (!query) return res.status(400).json({ error: "Query is required" });

  const result = await askLLM(query);
  res.json(result);
});

app.get("/", (req, res) => {
  res.send("MediLink backend is running!");
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
