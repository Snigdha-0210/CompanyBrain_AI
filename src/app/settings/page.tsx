'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useStore } from '@/lib/store'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Moon, Sun, Laptop } from 'lucide-react'

export default function SettingsPage() {
  const { theme, setTheme } = useStore()
  const [apiKey, setApiKey] = useState('')
  const [orgName, setOrgName] = useState('Acme Corp')

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      root.classList.add(systemTheme)
      return
    }
    root.classList.add(theme)
  }, [theme])

  const saveApiSettings = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('API configuration saved successfully')
  }

  const savePreferences = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('User preferences saved')
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <Tabs defaultValue="appearance" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="api">API Config</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>
        
        <TabsContent value="appearance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize the look and feel of InsightOS.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Theme Preference</Label>
                  <div className="grid grid-cols-3 gap-4 max-w-md">
                    <Button 
                      variant={theme === 'light' ? 'default' : 'outline'} 
                      onClick={() => setTheme('light')}
                      className="justify-start"
                    >
                      <Sun className="mr-2 h-4 w-4" />
                      Light
                    </Button>
                    <Button 
                      variant={theme === 'dark' ? 'default' : 'outline'} 
                      onClick={() => setTheme('dark')}
                      className="justify-start"
                    >
                      <Moon className="mr-2 h-4 w-4" />
                      Dark
                    </Button>
                    <Button 
                      variant={theme === 'system' ? 'default' : 'outline'} 
                      onClick={() => setTheme('system')}
                      className="justify-start"
                    >
                      <Laptop className="mr-2 h-4 w-4" />
                      System
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="api" className="mt-6">
          <Card>
            <form onSubmit={saveApiSettings}>
              <CardHeader>
                <CardTitle>API Configuration</CardTitle>
                <CardDescription>Manage keys for external AI and data providers.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 max-w-md">
                  <Label htmlFor="openai">OpenAI API Key</Label>
                  <Input 
                    id="openai" 
                    type="password" 
                    placeholder="sk-..." 
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Used for generating strategic insights and Company Brain.</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Save API Settings</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences" className="mt-6">
          <Card>
            <form onSubmit={savePreferences}>
              <CardHeader>
                <CardTitle>User Preferences</CardTitle>
                <CardDescription>Update your personal account details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 max-w-md">
                  <Label htmlFor="org">Organization Name</Label>
                  <Input 
                    id="org" 
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Save Preferences</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
