// llm.js
import { buildStructuredPrompt } from "./prompt.js";

export async function askLLM(query) {
  const prompt = buildStructuredPrompt(query);

  // Mock response for now
  const fakeLLMResponse = `{
    "summary": "Headache likely due to stress or dehydration.",
    "riskLevel": "low",
    "nextSteps": [
      "Rest in a quiet place",
      "Drink water",
      "Consult a doctor if it persists more than 2 days"
    ]
  }`;

  let parsed;
  try {
    parsed = JSON.parse(fakeLLMResponse);
  } catch {
    // 👇 No noisy stacktrace, just fallback
    parsed = {
      summary: "Unable to generate structured response.",
      riskLevel: "unknown",
      nextSteps: []
    };
  }

  return parsed;
}
