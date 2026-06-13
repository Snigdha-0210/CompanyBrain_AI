'use client'

import { useState, useRef, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { BrainCircuit, Send, User } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

interface Message {
  id: string
  role: 'user' | 'ai'
  content: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'ai', content: 'Hello! I am your Company Brain. You can ask me anything about our documents, financial metrics, client data, or compliance.' }
  ])
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      const scrollArea = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollArea) {
        scrollArea.scrollTop = scrollArea.scrollHeight
      }
    }
  }, [messages])

  const chatMutation = useMutation({
    mutationFn: async (question: string) => {
      const res = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ question }),
        headers: { 'Content-Type': 'application/json' }
      })

      if (!res.ok) throw new Error('Chat failed')
      if (!res.body) throw new Error('No body returned')

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      
      const aiMessageId = 'ai-' + Date.now()
      setMessages(prev => [...prev, { id: aiMessageId, role: 'ai', content: '' }])

      let done = false
      while (!done) {
        const { value, done: doneReading } = await reader.read()
        done = doneReading
        if (value) {
          const chunkValue = decoder.decode(value, { stream: !done })
          setMessages(prev => {
            const newMessages = [...prev]
            const lastMsgIdx = newMessages.findIndex(m => m.id === aiMessageId)
            if (lastMsgIdx !== -1) {
              newMessages[lastMsgIdx] = {
                ...newMessages[lastMsgIdx],
                content: newMessages[lastMsgIdx].content + chunkValue
              }
            }
            return newMessages
          })
        }
      }
    },
    onError: () => {
      toast.error('Failed to connect to Company Brain. Please try again.')
    }
  })

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || chatMutation.isPending) return
    
    setMessages(prev => [...prev, { id: 'user-' + Date.now(), role: 'user', content: input }])
    chatMutation.mutate(input)
    setInput('')
  }

  return (
    <div className="space-y-4 h-[calc(100vh-8rem)] flex flex-col">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Company Brain</h1>
        <p className="text-muted-foreground">Ask questions and get strategic answers based on company data.</p>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden shadow-md border">
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-6 pb-4 max-w-4xl mx-auto">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`p-2 rounded-full shrink-0 ${msg.role === 'ai' ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400' : 'bg-muted text-muted-foreground'}`}>
                  {msg.role === 'ai' ? <BrainCircuit className="h-5 w-5" /> : <User className="h-5 w-5" />}
                </div>
                <div className={`p-4 rounded-2xl max-w-[80%] text-sm leading-relaxed ${msg.role === 'ai' ? 'bg-muted/50 rounded-tl-sm' : 'bg-blue-600 text-white rounded-tr-sm'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {chatMutation.isPending && (
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full shrink-0 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
                  <BrainCircuit className="h-5 w-5" />
                </div>
                <div className="p-4 rounded-2xl rounded-tl-sm bg-muted/50 flex items-center gap-1.5 h-[52px]">
                  <div className="h-2 w-2 bg-blue-500/60 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="h-2 w-2 bg-blue-500/60 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="h-2 w-2 bg-blue-500/60 rounded-full animate-bounce"></div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="p-4 border-t bg-muted/20">
          <form onSubmit={handleSend} className="relative max-w-4xl mx-auto">
            <Input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about your company..." 
              className="pr-12 py-6 text-base rounded-xl shadow-sm bg-background border-muted-foreground/20"
              disabled={chatMutation.isPending}
            />
            <Button 
              type="submit"
              size="icon" 
              className="absolute right-2 top-2 h-8 w-8 rounded-lg bg-blue-600 hover:bg-blue-700"
              disabled={!input.trim() || chatMutation.isPending}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <div className="mt-3 text-xs text-center text-muted-foreground max-w-4xl mx-auto flex gap-2 justify-center flex-wrap">
            <span className="font-medium">Try asking:</span>
            <button type="button" onClick={() => setInput("Who is our biggest client?")} className="hover:text-blue-500 transition-colors">"Who is our biggest client?"</button> • 
            <button type="button" onClick={() => setInput("Which projects are delayed?")} className="hover:text-blue-500 transition-colors">"Which projects are delayed?"</button> • 
            <button type="button" onClick={() => setInput("What risks should leadership focus on?")} className="hover:text-blue-500 transition-colors">"What risks should leadership focus on?"</button>
          </div>
        </div>
      </Card>
    </div>
  )
}
