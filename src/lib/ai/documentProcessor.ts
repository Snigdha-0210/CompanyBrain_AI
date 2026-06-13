import { getVectorStore, saveVectorStore } from './vectorStore';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { Document } from '@langchain/core/documents';
import { PDFParse } from 'pdf-parse';

export async function processDocument(fileBuffer: Buffer, fileName: string, fileType: string) {
  let text = '';

  if (fileType === 'application/pdf') {
    const parser = new PDFParse({ data: fileBuffer });
    const data = await parser.getText();
    text = data.text;
  } else if (fileType === 'text/plain') {
    text = fileBuffer.toString('utf-8');
  } else if (fileType.startsWith('image/')) {
    const apiKey = process.env.GOOGLE_VISION_API_KEY;
    if (!apiKey) throw new Error('Google Vision API key missing for image processing');
    
    const base64Image = fileBuffer.toString('base64');
    const res = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        requests: [
          {
            image: { content: base64Image },
            features: [{ type: 'DOCUMENT_TEXT_DETECTION' }]
          }
        ]
      })
    });
    
    if (!res.ok) {
        throw new Error('Vision API error: ' + await res.text());
    }

    const data = await res.json();
    text = data.responses[0]?.fullTextAnnotation?.text || '';
  } else {
    // Attempt basic string decoding for unknown text files
    text = fileBuffer.toString('utf-8');
  }

  if (!text || text.trim() === '') {
    throw new Error('No text could be extracted from the document');
  }

  // Chunk the text
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const docs = await splitter.createDocuments([text], [{ source: fileName }]);

  // Add to vector store
  const store = await getVectorStore();
  await store.addDocuments(docs);
  
  // Save vector store to disk
  await saveVectorStore();

  return { success: true, chunks: docs.length };
}
