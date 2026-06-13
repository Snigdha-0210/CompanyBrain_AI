import { NextRequest, NextResponse } from 'next/server'
import { getVectorStore } from '@/lib/ai/vectorStore'
import { ChatGroq } from '@langchain/groq'
import { STRATEGY_SYSTEM_PROMPT } from '@/lib/ai/prompts'
import { getMarketResearch } from '@/lib/ai/marketResearch'

export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json()
    if (!question) return NextResponse.json({ error: 'Question required' }, { status: 400 })

    const store = await getVectorStore()
    
    // 1. Get Internal Context
    let docs: any[] = [];
    try {
      if (store.index && store.index.getCurrentCount() > 0) {
        docs = await store.similaritySearch(question, 5)
      }
    } catch (e) {
      console.warn("Skipping similarity search (empty store)", e)
    }
    const context = docs.map(d => d.pageContent).join("\n\n")

    // 2. Get External Context (Market Research) via Tavily
    // We modify the query slightly to get broader industry trends if needed
    const webContext = await getMarketResearch(`Industry trends related to: ${question}`)

    const model = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY,
      model: "llama-3.3-70b-versatile", // Use the most powerful model for strategy
      temperature: 0.2,
    })

    const prompt = STRATEGY_SYSTEM_PROMPT
      .replace('{context}', context || "No internal documents uploaded yet.")
      .replace('{web_context}', webContext)
      .replace('{question}', question)

    // 3. Generate Strategy
    const response = await model.invoke([
      { role: "system", content: prompt },
      { role: "user", content: "Generate the JSON object for the strategic action plan now." }
    ])

    let text = response.content as string
    let cleanText = text;
    
    try {
      if (text.includes("```json")) {
          cleanText = text.split("```json")[1].split("```")[0].trim()
      } else if (text.includes("```")) {
          cleanText = text.split("```")[1].trim()
      } else {
          const firstBrace = text.indexOf('{')
          const lastBrace = text.lastIndexOf('}')
          const firstBracket = text.indexOf('[')
          const lastBracket = text.lastIndexOf(']')
          let start = -1; let end = -1;
          if (firstBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
              start = firstBrace; end = lastBrace;
          } else if (firstBracket !== -1) {
              start = firstBracket; end = lastBracket;
          }
          if (start !== -1 && end !== -1) {
              cleanText = text.substring(start, end + 1);
          }
      }
      const parsed = JSON.parse(cleanText)
      return NextResponse.json(parsed)
    } catch (parseError) {
      console.error("Failed to parse JSON. Raw text:", text)
      throw parseError;
    }
  } catch (error: any) {
    console.error('Strategy error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
