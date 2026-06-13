'use client'

import { Bell, Search, UploadCloud, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useStore } from '@/lib/store'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

export function TopBar() {
  const { sidebarOpen } = useStore()
  const router = useRouter()

  return (
    <header className={cn(
      "fixed top-0 right-0 z-30 flex h-16 items-center justify-between border-b bg-background/80 backdrop-blur-md px-6 transition-all duration-300",
      sidebarOpen ? "left-64" : "left-20"
    )}>
      <div className="flex w-full max-w-md items-center space-x-2">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search across documents and insights..." 
            className="w-full bg-muted/50 pl-9 focus-visible:ring-blue-500"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" className="hidden md:flex gap-2" onClick={() => router.push('/documents')}>
          <UploadCloud className="h-4 w-4" />
          Upload Documents
        </Button>
        
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-600 border border-background"></span>
        </Button>
        
        <Button variant="ghost" size="icon" className="rounded-full bg-muted">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  )
}
