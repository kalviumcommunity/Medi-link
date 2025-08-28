// prompt.js

export const systemPrompt = `
You are a safe medical assistant.
ALWAYS respond ONLY in valid JSON (no extra text).
JSON schema:
{
  "summary": "short text summary of the issue",
  "riskLevel": "low | medium | high",
  "nextSteps": ["list of next steps as short strings"]
}
Guidelines:
- Never prescribe medication.
- Encourage professional consultation for serious concerns.
`;

const knowledgeBase = {
  headache: "Headaches are often linked to stress, dehydration, or lack of sleep.",
  fever: "Fevers may indicate infection. Stay hydrated and monitor temperature.",
  cough: "Coughing can be due to colds, allergies, or infections."
};

export function getDynamicContext(userQuery) {
  const lcQuery = userQuery.toLowerCase();
  const matches = Object.keys(knowledgeBase).filter((key) =>
    lcQuery.includes(key)
  );
  return matches.map((m) => knowledgeBase[m]);
}

export function buildStructuredPrompt(userQuery) {
  const contexts = getDynamicContext(userQuery);

  const contextBlock =
    contexts.length > 0 ? `Context:\n- ${contexts.join("\n- ")}\n` : "";

  return `
${systemPrompt}

${contextBlock}
User: ${userQuery}
Assistant:
  `.trim();
}
