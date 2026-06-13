'use client'

import { Lightbulb, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useState } from 'react'

export function RightPanel() {
  const [isOpen, setIsOpen] = useState(true)

  if (!isOpen) {
    return (
      <Button 
        variant="outline" 
        size="icon" 
        className="fixed right-0 top-20 z-20 rounded-l-md rounded-r-none border-r-0 shadow-md hidden xl:flex"
        onClick={() => setIsOpen(true)}
      >
        <Lightbulb className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <div className="fixed right-0 top-16 bottom-0 w-80 border-l bg-background z-20 hidden xl:block shadow-sm">
      <div className="flex h-12 items-center justify-between px-4 border-b">
        <div className="flex items-center gap-2 font-semibold">
          <Lightbulb className="h-4 w-4 text-amber-500" />
          Contextual Insights
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
          <X className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-4rem-3rem)] p-4">
        <div className="space-y-4">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 text-sm">
            <h4 className="font-semibold mb-1">Did you know?</h4>
            <p className="text-muted-foreground">Uploading documents with clear headings improves AI accuracy by 40%.</p>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 text-sm">
            <h4 className="font-semibold mb-1">Quick Action</h4>
            <p className="text-muted-foreground mb-3">Generate a strategic report based on recent uploads.</p>
            <Button size="sm" className="w-full">Generate Now</Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
