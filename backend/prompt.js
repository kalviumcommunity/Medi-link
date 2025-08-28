// prompt.js

// ---- System prompt (unchanged policy, tweak as needed) ----
export const systemPrompt = `
You are a helpful and safe medical assistant.
- Always give short, clear, and safe advice.
- Encourage consulting a doctor for serious issues.
- Do not provide prescriptions.
`;

// ---- Minimal internal KB (replace with RAG later) ----
const knowledgeBase = Object.freeze({
  headache: "Headaches are often caused by stress, dehydration, or lack of sleep.",
  fever: "Fevers can be a sign of infection. Rest and hydration are important.",
  cough: "Coughs may be due to colds, flu, or allergies. If persistent, consult a doctor.",
  dehydration: "Drink fluids regularly; watch for dizziness, dry mouth, and dark urine.",
});

// ---- Helpers (prevent inherited key iteration, improve matching) ----
function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function stem(word) {
  // ultralight stemming to catch "feverish", "coughing", "headaches"
  return word
    .replace(/(ing|ish|es|s)$/i, "")
    .replace(/(ed)$/i, "");
}

// Exported for unit tests / reuse
export function getDynamicContexts(userQuery, { maxContexts = 3 } = {}) {
  const q = normalize(userQuery);
  if (!q) return { contexts: [], matchedKeywords: [] };

  const words = new Set(q.split(" ").map(stem));

  const keys = Object.keys(knowledgeBase); // prevents inherited iteration
  const matched = [];
  for (const key of keys) {
    // match exact stem or synonym-like containment by stem
    const keyStem = stem(key);
    if (words.has(keyStem)) matched.push(key);
    if (matched.length >= maxContexts) break;
  }

  const contexts = matched.map(k => knowledgeBase[k]);
  return { contexts, matchedKeywords: matched };
}

// ---- Prompt builder: includes context only when present ----
export function buildPrompt(userQuery) {
  const cleanedQuery = userQuery.trim();
  const { contexts, matchedKeywords } = getDynamicContexts(cleanedQuery);

  const contextBlock = contexts.length
    ? `Context:\n- ${contexts.join("\n- ")}\n`
    : ""; // no noisy "No extra context..." line

  const prompt = `
${systemPrompt}

${contextBlock}User: ${cleanedQuery}
Assistant:
  `.trim();

  return { prompt, matchedKeywords };
}
