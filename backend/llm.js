import { SYSTEM_PROMPT, buildUserPrompt } from "./prompt.js";

export async function askLLM(query) {
  const systemPrompt = SYSTEM_PROMPT;
  const userPrompt = buildUserPrompt(query);

  console.log("=== Prompt Sent to AI (mock) ===");
  console.log(systemPrompt);
  console.log(userPrompt);

  // Mocked AI response
  if (query.toLowerCase().includes("headache")) {
    return { summary: "You may have a headache. Drink water and rest." };
  }
  return { summary: "I suggest consulting a doctor for more details." };
}