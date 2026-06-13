'use client'

import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'
import { RightPanel } from './RightPanel'
import { useStore } from '@/lib/store'
import { cn } from '@/lib/utils'

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { sidebarOpen } = useStore()

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col">
      <Sidebar />
      <TopBar />
      <RightPanel />
      <main className={cn(
        "transition-all duration-300 pt-16 min-h-screen xl:pr-80",
        sidebarOpen ? "pl-64" : "pl-20"
      )}>
        <div className="p-4 md:p-8 max-w-6xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  )
}
