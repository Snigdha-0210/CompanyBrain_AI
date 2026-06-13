import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), '.data', 'vectorstore');

// Use global to preserve across hot reloads in Next.js dev
const globalForVectorStore = global as unknown as { vectorStoreInstance: HNSWLib | null };

export async function getVectorStore(): Promise<HNSWLib> {
  if (globalForVectorStore.vectorStoreInstance) return globalForVectorStore.vectorStoreInstance;

  const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GEMINI_API_KEY,
    modelName: "gemini-embedding-2",
  });

  if (fs.existsSync(DATA_DIR) && fs.existsSync(path.join(DATA_DIR, 'hnswlib.index'))) {
    try {
      console.log('Loading existing vector store...');
      const store = await HNSWLib.load(DATA_DIR, embeddings);
      globalForVectorStore.vectorStoreInstance = store;
      return store;
    } catch (e) {
      console.error("Failed to load vector store from disk", e);
    }
  }

  console.log('Creating new vector store...');
  // Gemini embedding 2 has 3072 dimensions
  const store = new HNSWLib(embeddings, { space: "cosine", numDimensions: 3072 });
  globalForVectorStore.vectorStoreInstance = store;
  return store;
}

export async function saveVectorStore() {
  if (globalForVectorStore.vectorStoreInstance) {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    await globalForVectorStore.vectorStoreInstance.save(DATA_DIR);
  }
}
