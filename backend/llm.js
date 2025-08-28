// llm.js
import { buildPrompt } from "./prompt.js";

// Simulated LLM call
export async function askLLM(query) {
  const finalPrompt = buildPrompt(query);

  // Log prompt only in dev (to avoid leaking in production)
  if (process.env.NODE_ENV !== "production") {
    console.log("=== Prompt Sent to AI ===");
    console.log(finalPrompt);
    console.log("==========================");
  }

  // Mock AI response
  return "This is a mock AI response based on system + user prompts.";
}
