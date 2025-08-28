// llm.js
import { buildPrompt } from "./prompt.js";

export async function askLLM(query) {
  const finalPrompt = buildPrompt(query);

  console.log("=== Prompt Sent to AI ===");
  console.log(finalPrompt);

  // Mock AI response for now
  return "This is a mock AI response based on system + user prompts.";
}
