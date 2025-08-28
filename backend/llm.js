// llm.js
// ES Module: make sure package.json has "type": "module"
import { initVectorDB, searchVectorDB } from "./vectordb.js";

/**
 * Minimal local fallback KB in case vector DB isn't ready.
 */
const fallbackKB = [
  "Headaches are often caused by stress or dehydration.",
  "Fever may be a sign of infection or inflammation.",
  "A balanced diet improves overall health."
];

let vectorReady = false;
let vectorInitError = null;

/**
 * Initialize Vector DB once.
 */
async function ensureVectorReady() {
  if (vectorReady || vectorInitError) return;
  try {
    await initVectorDB();
    vectorReady = true;
    if (process.env.NODE_ENV !== "production") {
      console.log("✅ Vector DB initialized");
    }
  } catch (err) {
    vectorInitError = err;
    if (process.env.NODE_ENV !== "production") {
      console.warn("⚠️ Vector DB init failed, using fallback KB:", err?.message || err);
    }
  }
}

/**
 * Pick best fallback doc by simple keyword heuristic.
 */
function fallbackSearch(query) {
  const q = (query || "").toLowerCase();
  if (q.includes("headache")) return fallbackKB[0];
  if (q.includes("fever")) return fallbackKB[1];
  if (q.includes("diet") || q.includes("food") || q.includes("nutrition")) return fallbackKB[2];
  return null;
}

/**
 * Normalize Chroma-like query results into a best doc string.
 */
function pickBestDoc(results) {
  // Expecting shape like: { documents: [ [ "doc1", "doc2", ... ] ], distances/similarities: ... }
  if (!results) return null;
  const docs = results.documents;
  if (Array.isArray(docs) && docs.length > 0 && Array.isArray(docs[0]) && docs[0].length > 0) {
    return docs[0][0]; // top-1
  }
  return null;
}

/**
 * Main LLM entry — uses Vector DB if available, else fallback KB.
 * Returns a consistent structured JSON object.
 */
export async function askLLM(query) {
  await ensureVectorReady();

  let context = null;

  if (vectorReady) {
    try {
      const results = await searchVectorDB(query);
      context = pickBestDoc(results);
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        console.warn("⚠️ Vector DB query failed, switching to fallback:", err?.message || err);
      }
      context = null;
    }
  }

  if (!context) {
    context = fallbackSearch(query);
  }

  return {
    type: "answer",
    query,
    context,
    response: context
      ? `Based on our knowledge: ${context}`
      : "Sorry, I could not find relevant information."
  };
}

/**
 * Alias for compatibility with earlier imports (`handleLLM`).
 */
export const handleLLM = askLLM;
