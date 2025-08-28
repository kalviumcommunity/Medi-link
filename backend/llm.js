// llm.js
import { searchKnowledge } from "./embeddings.js";

export async function askLLM(query) {
  // 1. Search knowledge base with embeddings
  const context = searchKnowledge(query);

  // 2. Return structured response
  return {
    type: "answer",
    query,
    context,
    response: context
      ? `Based on our knowledge: ${context}`
      : "Sorry, I could not find relevant information."
  };
}
