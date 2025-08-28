import { buildPrompt } from "./prompt.js";

export async function askLLM(query) {
  const finalPrompt = buildPrompt(query);

  if (process.env.NODE_ENV !== "production") {
    console.log("=== Prompt Sent to AI ===");
    console.log(finalPrompt);
    console.log("==========================");
  }

  return "This is a mock AI response based on system + context + user prompt.";
}
