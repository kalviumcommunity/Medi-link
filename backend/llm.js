// llm.js
import { findHospital } from "./functions.js";

export async function handleLLM(query) {
  if (query.toLowerCase().includes("hospital")) {
    const cityMatch = query.match(/in\s+(\w+)/i);
    if (cityMatch) {
      const city = cityMatch[1];
      const hospitals = findHospital(city);
      return { type: "answer", content: hospitals };
    }
    return { type: "answer", content: ["Please specify a city."] };
  }

  return {
    type: "answer",
    content: ["This query does not require a function call."]
  };
}
