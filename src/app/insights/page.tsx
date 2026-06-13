'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Lightbulb, ArrowRight, TrendingUp, AlertTriangle, ShieldCheck, Users } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export default function InsightsPage() {
  const router = useRouter();
  const { data: insights, isLoading } = useQuery({
    queryKey: ['insights'],
    queryFn: async () => {
      const res = await fetch('/api/insights')
      if (!res.ok) throw new Error('Failed to fetch insights')
      return res.json()
    }
  })

  const getIcon = (category: string) => {
    switch (category) {
      case 'Revenue Insights': return <TrendingUp className="h-5 w-5 text-emerald-500" />
      case 'Customer Insights': return <Users className="h-5 w-5 text-blue-500" />
      case 'Operational Insights': return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case 'Compliance Insights': return <ShieldCheck className="h-5 w-5 text-purple-500" />
      default: return <Lightbulb className="h-5 w-5 text-muted-foreground" />
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-emerald-500'
    if (score >= 70) return 'bg-blue-500'
    if (score >= 50) return 'bg-amber-500'
    return 'bg-red-500'
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">AI Insights</h1>
        <p className="text-muted-foreground">Actionable intelligence automatically generated from your company documents.</p>
      </div>

      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2, 3, 4].map(i => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="h-24 bg-muted/50 rounded-t-xl"></CardHeader>
              <CardContent className="h-32"></CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {insights?.map((insight: any) => (
            <Card key={insight.id} className="flex flex-col shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="bg-muted font-medium py-1 px-2">
                    {getIcon(insight.category)}
                    <span className="ml-2">{insight.category}</span>
                  </Badge>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <span className="text-muted-foreground">Confidence:</span>
                    <span className={insight.confidenceScore >= 90 ? 'text-emerald-600' : 'text-blue-600'}>
                      {insight.confidenceScore}%
                    </span>
                  </div>
                </div>
                <CardTitle className="text-xl">{insight.title}</CardTitle>
                <CardDescription className="text-base mt-2">{insight.summary}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-2 mt-auto">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>AI Confidence Score</span>
                  </div>
                  <Progress value={insight.confidenceScore} className={`h-1.5 [&>div]:${getScoreColor(insight.confidenceScore)}`} />
                </div>
              </CardContent>
              <CardFooter className="bg-muted/30 border-t pt-6">
                <div className="w-full">
                  <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-amber-500" />
                    Recommended Action
                  </h4>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">{insight.recommendedAction}</p>
                    <Button 
                      size="sm" 
                      className="shrink-0 group bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-200"
                      onClick={() => {
                        router.push(`/strategy?action=${encodeURIComponent(insight.recommendedAction)}`);
                      }}
                    >
                      Take Action
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
