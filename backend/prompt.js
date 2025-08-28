// prompt.js
export const systemPrompt = `
You are a helpful and safe medical assistant.
- Always give short, clear, and safe advice.
- Encourage consulting a doctor for serious issues.
- Do not provide prescriptions.
`;

export function buildPrompt(userQuery) {
  return `
${systemPrompt}

User: ${userQuery}
Assistant:`;
}
