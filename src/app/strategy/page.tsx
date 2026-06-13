'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Target, Zap, ArrowRight, BrainCircuit, CheckCircle2, TrendingUp } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

export default function StrategyPage() {
  const [question, setQuestion] = useState('What should leadership focus on next quarter?')
  const [recommendations, setRecommendations] = useState<any[]>([])

  const strategyMutation = useMutation({
    mutationFn: async (q: string) => {
      const res = await fetch('/api/strategy', {
        method: 'POST',
        body: JSON.stringify({ question: q }),
        headers: { 'Content-Type': 'application/json' }
      })
      if (!res.ok) throw new Error('Failed to generate strategy')
      return res.json()
    },
    onSuccess: (data) => {
      setRecommendations(data.recommendations)
      toast.success('Strategic recommendations generated successfully')
    },
    onError: () => {
      toast.error('Failed to generate recommendations')
    }
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const action = params.get('action');
      if (action) {
        const q = `How do we execute this strategic action: "${action}"?`;
        setQuestion(q);
        // Add a slight delay to allow UI to render first
        setTimeout(() => {
          strategyMutation.mutate(q);
        }, 100);
        // Remove param from URL to prevent infinite triggers on refresh
        window.history.replaceState({}, '', '/strategy');
      }
    }
  }, []);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim()) return
    strategyMutation.mutate(question)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Strategic Advisor</h1>
        <p className="text-muted-foreground">Executive dashboard for high-level decision making and strategic planning.</p>
      </div>

      <Card className="bg-gradient-to-br from-blue-900 via-slate-900 to-slate-900 text-white border-0 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
          <BrainCircuit className="w-64 h-64" />
        </div>
        <CardHeader className="relative z-10 pb-4">
          <CardTitle className="text-2xl text-blue-100">Ask the Executive AI</CardTitle>
          <CardDescription className="text-blue-200/70 text-base">Generate data-backed strategic recommendations.</CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          <form onSubmit={handleGenerate} className="flex flex-col sm:flex-row gap-4">
            <Input 
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="flex-1 text-lg py-6 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-blue-500"
            />
            <Button 
              type="submit" 
              size="lg" 
              className="h-[52px] px-8 bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg shadow-blue-900/50"
              disabled={strategyMutation.isPending}
            >
              {strategyMutation.isPending ? (
                <>
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-5 w-5" />
                  Generate Recommendations
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {recommendations.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold flex items-center gap-2 border-b pb-2">
            <Target className="h-6 w-6 text-blue-600" />
            Strategic Action Plan
          </h3>
          <div className="grid gap-6">
            {recommendations.map((rec: any, index: number) => (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-l-4 border-l-blue-600 shadow-sm hover:shadow-md transition-all">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start gap-4">
                      <CardTitle className="text-xl leading-tight">{rec.recommendation}</CardTitle>
                      <div className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${rec.confidenceLevel === 'High' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400'}`}>
                        {rec.confidenceLevel} Confidence
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
                        <TrendingUp className="h-4 w-4 text-emerald-600" />
                        Business Impact
                      </h4>
                      <p className="text-sm text-muted-foreground">{rec.businessImpact}</p>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4 text-blue-600" />
                        Supporting Evidence
                      </h4>
                      <p className="text-sm text-muted-foreground">{rec.supportingEvidence}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-muted/20 border-t justify-end py-3">
                    <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/30">
                      View Detailed Analysis
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
