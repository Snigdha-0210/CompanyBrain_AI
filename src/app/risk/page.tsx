'use client'

import { useQuery } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { AlertCircle, TrendingDown, ShieldAlert, ArrowUpRight } from 'lucide-react'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Progress } from '@/components/ui/progress'
import { useStore } from '@/lib/store'

export default function RiskAnalysisPage() {
  const selectedDocuments = useStore(state => state.selectedDocuments);
  const { data: riskData, isLoading } = useQuery({
    queryKey: ['risk-analysis', selectedDocuments],
    queryFn: async () => {
      const queryParams = new URLSearchParams()
      if (selectedDocuments.length > 0) {
        queryParams.append('docs', selectedDocuments.join(','))
      }
      const res = await fetch(`/api/risk-analysis?${queryParams.toString()}`)
      if (!res.ok) throw new Error('Failed to fetch')
      return res.json()
    }
  })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Risk Analysis</h1>
        <p className="text-muted-foreground">Monitor and mitigate business, compliance, and financial risks.</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12"><div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="bg-red-500 text-white border-0 shadow-lg col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-white/80 font-medium text-sm flex items-center justify-between">
                  Overall Risk Score
                  <ShieldAlert className="h-4 w-4" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-bold mb-2">{riskData?.overallRiskScore}</div>
                <div className="flex items-center text-sm font-medium text-red-100">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  +3 points from last month
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-2 shadow-sm">
              <CardHeader>
                <CardTitle>Risk Trend (6 Months)</CardTitle>
              </CardHeader>
              <CardContent className="h-[180px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={riskData?.riskTrend}>
                    <defs>
                      <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
                    <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Area type="monotone" dataKey="score" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorRisk)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="shadow-sm border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                  High Risk Projects
                </CardTitle>
                <CardDescription>Projects requiring immediate mitigation.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {riskData?.highRiskProjects.map((project: any, i: number) => (
                    <div key={i} className="flex flex-col space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{project.name}</div>
                        <div className={`text-xs px-2 py-1 rounded-full font-semibold ${project.risk === 'Critical' ? 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300'}`}>
                          {project.risk}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground flex justify-between">
                        <span>{project.reason}</span>
                        <span className="font-medium text-foreground">Impact: {project.impact}</span>
                      </div>
                      <Progress value={project.risk === 'Critical' ? 90 : 75} className={`h-1.5 ${project.risk === 'Critical' ? '[&>div]:bg-red-500' : '[&>div]:bg-amber-500'}`} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="h-5 w-5 text-blue-500" />
                  Financial & Compliance
                </CardTitle>
                <CardDescription>Key exposures and regulatory gaps.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold mb-3 border-b pb-2">Compliance Gaps</h4>
                    <div className="space-y-3">
                      {riskData?.complianceGaps.map((gap: any, i: number) => (
                        <div key={i} className="flex justify-between items-center text-sm">
                          <div>
                            <span className="font-medium block">{gap.area}</span>
                            <span className="text-muted-foreground text-xs">Deadline: {gap.deadline}</span>
                          </div>
                          <div className={`text-xs px-2 py-1 rounded font-medium ${gap.severity === 'High' ? 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300'}`}>
                            {gap.severity}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-3 border-b pb-2">Financial Exposure</h4>
                    <div className="space-y-3">
                      {riskData?.financialRisks.map((risk: any, i: number) => (
                        <div key={i} className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground w-2/3 truncate pr-4" title={risk.description}>{risk.description}</span>
                          <span className="font-semibold">{risk.exposure}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  )
}
