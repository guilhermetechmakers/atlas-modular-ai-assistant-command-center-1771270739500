import { Link } from 'react-router-dom'
import { Bot, Clock, CheckCircle, XCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import type { AgentActivityItem } from '@/types/command-center'

export interface AgentActivityFeedProps {
  items: AgentActivityItem[]
  isLoading?: boolean
  onApprove?: (id: string) => void
  onReject?: (id: string) => void
}

const statusConfig = {
  pending: { icon: Clock, label: 'Pending', class: 'text-muted-foreground' },
  approved: { icon: CheckCircle, label: 'Approved', class: 'text-green-500' },
  rejected: { icon: XCircle, label: 'Rejected', class: 'text-destructive' },
}

export function AgentActivityFeed({
  items,
  isLoading,
  onApprove,
  onReject,
}: AgentActivityFeedProps) {
  const pending = items.filter((i) => i.status === 'pending')
  const recent = items.slice(0, 8)

  return (
    <Card className="border-border transition-all duration-200 hover:shadow-card-hover hover:border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            <Bot className="h-5 w-5 text-primary" aria-hidden />
          </span>
          Agent activity
        </CardTitle>
        <CardDescription>Recent agent outputs and pending approvals.</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-14 w-full rounded-lg" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border py-8 text-center text-sm text-muted-foreground">
            <Bot className="mx-auto h-10 w-10 opacity-50" />
            <p className="mt-2">No recent activity.</p>
            <p className="mt-1">Run a prompt from Agent Builder or Quick actions.</p>
            <Button variant="outline" size="sm" className="mt-4" asChild>
              <Link to="/dashboard/agents">Agent Builder</Link>
            </Button>
          </div>
        ) : (
          <ul className="space-y-2">
            {recent.map((item) => {
              const config = statusConfig[item.status]
              const Icon = config.icon
              return (
                <li
                  key={item.id}
                  className="flex items-center gap-3 rounded-lg border border-border px-3 py-2 transition-colors hover:bg-secondary/30"
                >
                  <Icon className={cn('h-4 w-4 shrink-0', config.class)} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {config.label} · {item.created_at}
                    </p>
                  </div>
                  {item.status === 'pending' && (
                    <div className="flex shrink-0 gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-green-500 hover:text-green-400 focus-visible:ring-2 focus-visible:ring-ring"
                        onClick={() => onApprove?.(item.id)}
                        aria-label="Approve"
                      >
                        Approve
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-destructive hover:text-destructive/90 focus-visible:ring-2 focus-visible:ring-ring"
                        onClick={() => onReject?.(item.id)}
                        aria-label="Reject"
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                  {item.href && item.status !== 'pending' && (
                    <Button variant="ghost" size="sm" asChild>
                      <a href={item.href}>View</a>
                    </Button>
                  )}
                </li>
              )
            })}
          </ul>
        )}
        {pending.length > 0 && (
          <p className="mt-2 text-xs text-muted-foreground">
            {pending.length} pending approval{pending.length !== 1 ? 's' : ''}.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
