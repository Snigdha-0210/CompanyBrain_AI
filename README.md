# CompanyBrain_AI 🧠

> **The AI Chief Operating Officer that turns scattered company documents into strategic intelligence.**

![CompanyBrain_AI](public/logo.png)

## Overview

🚀 **Live Demo:** [https://companybrain-ai.vercel.app](https://companybrain-ai.vercel.app) *(Note: Depending on your Vercel settings, this URL might have a slightly different suffix).*

CompanyBrain_AI is an autonomous AI Executive advisor. It acts as an AI COO for your company, seamlessly connecting the dots between your contracts, financial reports, meeting notes, and strategy roadmaps to eliminate blind spots. 

Instead of a standard "PDF chatbot", CompanyBrain_AI ingests entire folders of unstructured data to:
- Generate actionable **Strategic Insights**
- Calculate real-time **Business & Compliance Risk**
- Provide multi-quarter **Executive Strategy Action Plans** based on internal data and external market research.

## Features

- **Document Ingestion:** Upload multiple PDFs, DOCXs, and TXTs simultaneously.
- **RAG Architecture:** Lightning-fast vector embeddings for deep contextual understanding.
- **Risk Analysis Dashboard:** Automatically detects delayed projects, compliance gaps, and financial exposures.
- **Strategic Advisor:** Combines internal company knowledge with live external web searches to generate actionable business strategy.
- **Zero Hallucination Protocol:** Strictly grounded responses based *only* on the provided documents.

## Tech Stack

- **Frontend:** Next.js 14, React, TailwindCSS, shadcn/ui
- **Backend:** Next.js App Router (Serverless APIs)
- **AI Models:** Llama 3.3 (70B) via Groq for ultra-fast inference
- **Database:** Firebase Admin SDK (Firestore)
- **Vector Store:** ChromaDB / Local MemoryVectorStore
- **Market Research:** Tavily Search API

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Snigdha-0210/CompanyBrain_AI.git
cd CompanyBrain_AI
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Rename `.env.example` to `.env.local` and add your API keys:
```env
# Backend AI Keys (DO NOT EXPOSE THESE PUBLICLY)
GROQ_API_KEY="your_groq_api_key_here"
TAVILY_API_KEY="your_tavily_api_key_here"

# Firebase Admin Keys for Backend Database
FIREBASE_PROJECT_ID="your_firebase_project_id_here"
FIREBASE_CLIENT_EMAIL="your_firebase_service_account_email_here"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour_Hashed_Private_Key_Here\n-----END PRIVATE KEY-----\n"

# NEXT_PUBLIC keys (Safe for frontend)
NEXT_PUBLIC_FIREBASE_API_KEY="your_public_firebase_api_key"
```

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## License
Distributed under the MIT License. See `LICENSE` for more information.
