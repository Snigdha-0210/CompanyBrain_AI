import { NextRequest, NextResponse } from 'next/server'
import { processDocument } from '@/lib/ai/documentProcessor'
import { dbAdmin } from '@/lib/firebase-admin'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    
    // Process the document using AI
    const result = await processDocument(buffer, file.name, file.type)

    // Save metadata to Firestore using Admin SDK
    const newDoc = {
      name: file.name,
      type: file.type.split('/')[1] || file.name.split('.').pop() || 'Unknown',
      date: new Date().toISOString().split('T')[0],
      status: 'Ready'
    }
    
    const docRef = await dbAdmin.collection('documents').add(newDoc)
    const documentId = docRef.id

    return NextResponse.json({ 
      success: true, 
      documentId,
      message: `Successfully processed ${result.totalChunks} chunks`
    })
  } catch (error: any) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
