import { NextRequest, NextResponse } from 'next/server'
import { getVectorStore } from '@/lib/ai/vectorStore'
import { ChatGroq } from '@langchain/groq'
import { QA_SYSTEM_PROMPT } from '@/lib/ai/prompts'

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json()
    if (!question) return NextResponse.json({ error: 'Question required' }, { status: 400 })

    const store = await getVectorStore()
    
    // Manually retrieve documents safely
    let docs: any[] = [];
    try {
      if (store.index && store.index.getCurrentCount() > 0) {
        docs = await store.similaritySearch(question, 5)
      }
    } catch (e) {
      console.warn("Skipping similarity search (empty store)", e)
    }
    const context = docs.map(d => d.pageContent).join("\n\n")

    const model = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY,
      model: "llama-3.1-8b-instant", // Fast chat model
      temperature: 0.2,
      streaming: true,
    })

    const prompt = QA_SYSTEM_PROMPT.replace('{context}', context || "No internal documents uploaded yet.")

    const stream = await model.stream([
      { role: "system", content: prompt },
      { role: "user", content: question }
    ])

    const encoder = new TextEncoder()
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (chunk.content) {
              controller.enqueue(encoder.encode(chunk.content as string))
            }
          }
          controller.close()
        } catch (e) {
          controller.error(e)
        }
      }
    })

    return new Response(readable, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    })
  } catch (error: any) {
    console.error('Chat error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
