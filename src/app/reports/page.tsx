'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { FileText, Download, FileSpreadsheet, FileBarChart } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export default function ReportsPage() {
  const [activeFormat, setActiveFormat] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)

  const generateMutation = useMutation({
    mutationFn: async (format: string) => {
      setActiveFormat(format)
      setProgress(10)
      
      const interval = setInterval(() => {
        setProgress(prev => Math.min(prev + 15, 90))
      }, 300)

      const res = await fetch('/api/reports/generate', {
        method: 'POST',
        body: JSON.stringify({ format }),
        headers: { 'Content-Type': 'application/json' }
      })

      clearInterval(interval)
      setProgress(100)

      if (!res.ok) throw new Error('Report generation failed')
      return res.json()
    },
    onSuccess: (data) => {
      toast.success(data.message)
      setTimeout(() => {
        setActiveFormat(null)
        setProgress(0)
        // Simulate file download
        const a = document.createElement('a')
        a.href = '#'
        a.download = data.downloadUrl.split('/').pop() || 'report'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      }, 500)
    },
    onError: () => {
      toast.error('Failed to generate report')
      setActiveFormat(null)
      setProgress(0)
    }
  })

  const handleGenerate = (format: string) => {
    if (generateMutation.isPending) return
    generateMutation.mutate(format)
  }

  const reports = [
    { title: 'Executive Summary', desc: 'High-level overview of company health and risks.', icon: FileText, format: 'pdf', color: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' },
    { title: 'Financial Data Export', desc: 'Raw financial metrics and historical data.', icon: FileSpreadsheet, format: 'excel', color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' },
    { title: 'Compliance Audit', desc: 'Detailed compliance gap analysis.', icon: FileBarChart, format: 'csv', color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Reports & Exports</h1>
        <p className="text-muted-foreground">Generate and download comprehensive company reports.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {reports.map((report, i) => (
          <Card key={i} className="flex flex-col">
            <CardHeader>
              <div className={`w-12 h-12 rounded-lg ${report.color} flex items-center justify-center mb-4`}>
                <report.icon className="h-6 w-6" />
              </div>
              <CardTitle>{report.title}</CardTitle>
              <CardDescription>{report.desc}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto pt-6 border-t">
              <div className="space-y-4">
                {activeFormat === report.format && progress > 0 ? (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground animate-pulse">Generating...</span>
                      <span className="font-medium">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                ) : (
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => handleGenerate(report.format)}
                    disabled={generateMutation.isPending}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Generate {report.format.toUpperCase()}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
