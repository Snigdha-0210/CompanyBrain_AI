'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useStore } from '@/lib/store'
import { 
  LayoutDashboard, 
  BrainCircuit, 
  Files, 
  Lightbulb, 
  ShieldAlert, 
  TrendingUp, 
  FileText, 
  Settings,
  Menu
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const navItems = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Company Brain', href: '/chat', icon: BrainCircuit },
  { name: 'Documents', href: '/documents', icon: Files },
  { name: 'Insights', href: '/insights', icon: Lightbulb },
  { name: 'Risk Analysis', href: '/risk', icon: ShieldAlert },
  { name: 'Strategic Advisor', href: '/strategy', icon: TrendingUp },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const { sidebarOpen, toggleSidebar } = useStore()

  return (
    <div className={cn(
      "fixed left-0 top-0 z-40 h-screen bg-background border-r transition-all duration-300",
      sidebarOpen ? "w-64" : "w-20"
    )}>
      <div className="flex h-16 items-center justify-between px-4 border-b">
        {sidebarOpen && (
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600">
            InsightOS
          </span>
        )}
        <Button variant="ghost" size="icon" onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      
      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 rounded-lg px-3 py-2.5 transition-all",
                isActive 
                  ? "bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300" 
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                !sidebarOpen && "justify-center px-0"
              )}
              title={!sidebarOpen ? item.name : undefined}
            >
              <item.icon className={cn("h-5 w-5", isActive ? "text-blue-600 dark:text-blue-400" : "")} />
              {sidebarOpen && <span className="font-medium">{item.name}</span>}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
