// embeddings.js
import fs from "fs";

// Load knowledge base
const knowledge = JSON.parse(fs.readFileSync("./knowledge.json", "utf-8"));

// Fake embedding function (turns text into bag-of-words vector)
function embed(text) {
  const words = text.toLowerCase().split(/\W+/);
  const freq = {};
  words.forEach((w) => (freq[w] = (freq[w] || 0) + 1));
  return freq;
}

// Cosine similarity between two vectors
function cosineSim(vecA, vecB) {
  const words = new Set([...Object.keys(vecA), ...Object.keys(vecB)]);
  let dot = 0,
    normA = 0,
    normB = 0;
  words.forEach((w) => {
    const a = vecA[w] || 0;
    const b = vecB[w] || 0;
    dot += a * b;
    normA += a * a;
    normB += b * b;
  });
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Search for most relevant knowledge
export function searchKnowledge(query) {
  const queryVec = embed(query);
  let bestMatch = null;
  let bestScore = -1;
  for (const item of knowledge) {
    const score = cosineSim(queryVec, embed(item.text));
    if (score > bestScore) {
      bestScore = score;
      bestMatch = item.text;
    }
  }
  return bestMatch;
}
