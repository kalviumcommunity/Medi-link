// prompt.js

// System-level instruction
export const systemPrompt = `
You are a helpful and safe medical assistant.
- Always give short, clear, and safe advice.
- Encourage consulting a doctor for serious issues.
- Do not provide prescriptions.
`;

// Function to build the full prompt
export function buildPrompt(userQuery) {
  const cleanedQuery = userQuery.trim();
  return `
${systemPrompt}

User: ${cleanedQuery}
Assistant:
  `;
}
