import { Link } from 'react-router-dom'
import { Wallet, TrendingUp, AlertTriangle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import type { FinanceTransaction } from '@/types/command-center'

export interface FinanceSnapshotCardProps {
  transactions: FinanceTransaction[]
  runwayMonths: number | null
  isLoading?: boolean
}

const RUNWAY_ALERT_THRESHOLD = 3

export function FinanceSnapshotCard({
  transactions,
  runwayMonths,
  isLoading,
}: FinanceSnapshotCardProps) {
  const showRunwayAlert =
    runwayMonths !== null && runwayMonths <= RUNWAY_ALERT_THRESHOLD && runwayMonths >= 0
  const recent = transactions.slice(0, 5)

  return (
    <Card className="border-border transition-all duration-200 hover:shadow-card-hover hover:border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            <Wallet className="h-5 w-5 text-primary" aria-hidden />
          </span>
          Finance snapshot
        </CardTitle>
        <CardDescription>Recent transactions and runway.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        ) : (
          <>
            {showRunwayAlert && (
              <div className="flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>
                  Runway: {runwayMonths} month{runwayMonths !== 1 ? 's' : ''} — consider reviewing
                  budget.
                </span>
              </div>
            )}
            {runwayMonths !== null && !showRunwayAlert && (
              <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 px-3 py-2">
                <span className="text-sm text-muted-foreground">Runway</span>
                <span className="flex items-center gap-1 text-sm font-medium text-white">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  {runwayMonths} months
                </span>
              </div>
            )}
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Recent transactions
              </p>
              {recent.length === 0 ? (
                <div className="rounded-lg border border-dashed border-border bg-muted/30 py-8 text-center">
                  <Wallet className="mx-auto h-10 w-10 text-muted-foreground/60" aria-hidden />
                  <p className="mt-2 text-sm font-medium text-muted-foreground">No transactions yet</p>
                  <p className="mt-1 text-xs text-muted-foreground">Import CSV or add transactions in Finance Cockpit.</p>
                  <Button variant="outline" size="sm" className="mt-4" asChild>
                    <Link to="/dashboard/finance">Finance Cockpit</Link>
                  </Button>
                </div>
              ) : (
                <ul className="space-y-1">
                  {recent.map((t) => (
                    <li
                      key={t.id}
                      className="flex items-center justify-between rounded-lg px-2 py-1.5 text-sm hover:bg-secondary/30"
                    >
                      <span className="truncate">{t.description}</span>
                      <span
                        className={cn(
                          'shrink-0 font-medium',
                          t.type === 'in' ? 'text-green-500' : 'text-muted-foreground'
                        )}
                      >
                        {t.type === 'in' ? '+' : '-'}
                        {Math.abs(t.amount).toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link to="/dashboard/finance">Finance Cockpit</Link>
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}
