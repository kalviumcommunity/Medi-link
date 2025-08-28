// llm.js
import { buildPrompt } from "./prompt.js";

// basic redactor to avoid logging raw PHI
function redactForLogs(text, maxLen = 80) {
  if (!text) return "";
  const clipped = text.slice(0, maxLen);
  return clipped
    .replace(/\b[\w._%+-]+@[\w.-]+\.[A-Za-z]{2,}\b/g, "<email>")
    .replace(/\b\d{3,}\b/g, "<num>");
}

export async function askLLM(query) {
  const { prompt, matchedKeywords } = buildPrompt(query);

  // Log only when explicitly enabled, and only minimal/redacted info
  if (process.env.DEBUG_PROMPTS === "true") {
    console.log("=== Prompt Debug ===");
    console.log("Matched keywords:", matchedKeywords.join(", ") || "(none)");
    console.log("Redacted user snippet:", redactForLogs(query));
    // If you really need full prompt in dev, toggle a second guard:
    if (process.env.DEBUG_FULL_PROMPT === "true") {
      console.log("Full prompt:\n", prompt);
    }
    console.log("====================");
  }

  // Mock response placeholder (replace with real LLM call later)
  return "This is a mock AI response based on system + dynamic context + user prompt.";
}
