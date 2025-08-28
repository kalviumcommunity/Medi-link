export const SYSTEM_PROMPT = "You are a helpful medical assistant.";

export function buildUserPrompt(query) {
  return `User asked: ${query}`;
}