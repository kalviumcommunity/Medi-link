// prompt.js

// Static system instructions
export const systemPrompt = `
You are a helpful and safe medical assistant.
- Always give short, clear, and safe advice.
- Encourage consulting a doctor for serious issues.
- Do not provide prescriptions.
`;

// Example dynamic knowledge base (can be replaced with DB/API)
const knowledgeBase = {
  headache: "Headaches are often caused by stress, dehydration, or lack of sleep.",
  fever: "Fevers can be a sign of infection. Rest and hydration are important.",
  cough: "Coughs may be due to colds, flu, or allergies. If persistent, consult a doctor.",
};

// Pick context dynamically based on query
function getDynamicContext(query) {
  query = query.toLowerCase();
  for (const keyword in knowledgeBase) {
    if (query.includes(keyword)) {
      return knowledgeBase[keyword];
    }
  }
  return "No extra context available.";
}

// Build prompt with dynamic context
export function buildPrompt(userQuery) {
  const cleanedQuery = userQuery.trim();
  const context = getDynamicContext(cleanedQuery);

  return `
${systemPrompt}

Context: ${context}

User: ${cleanedQuery}
Assistant:
  `;
}
