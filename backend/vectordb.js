// vectordb.js
// ES Module

import { ChromaClient } from "chromadb";

let client;
let collection;

/**
 * Initialize Vector DB and create collection if not already done.
 */
export async function initVectorDB() {
  if (collection) return collection; // already initialized

  client = new ChromaClient();
  collection = await client.createCollection({
    name: "medical_knowledge",
  });

  // Seed with some docs
  await collection.add({
    ids: ["1", "2", "3"],
    documents: [
      "Headaches are often caused by stress or dehydration.",
      "Fever may be a sign of infection or inflammation.",
      "A balanced diet improves overall health.",
    ],
  });

  return collection;
}

/**
 * Run a similarity search against the collection.
 */
export async function searchVectorDB(query) {
  if (!collection) {
    await initVectorDB();
  }
  return await collection.query({
    queryTexts: [query],
    nResults: 1,
  });
}
