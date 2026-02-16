import { Link } from 'react-router-dom'
import { Calendar, CheckSquare, Clock } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import type { TodayEvent, QuickTask } from '@/types/command-center'

export interface TodayPanelProps {
  events: TodayEvent[]
  quickTasks: QuickTask[]
  isLoading?: boolean
  onTaskToggle?: (taskId: string, done: boolean) => void
}

function formatTime(iso: string): string {
  try {
    const d = new Date(iso)
    return d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
  } catch {
    return ''
  }
}

export function TodayPanel({
  events,
  quickTasks,
  isLoading,
  onTaskToggle,
}: TodayPanelProps) {
  const hasEvents = events.length > 0
  const hasTasks = quickTasks.length > 0

  return (
    <Card className="border-border transition-all duration-200 hover:shadow-card-hover hover:border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            <Calendar className="h-5 w-5 text-primary" aria-hidden />
          </span>
          Today
        </CardTitle>
        <CardDescription>Calendar events, focus blocks, and quick tasks.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <>
            <Skeleton className="h-16 w-full rounded-lg" />
            <Skeleton className="h-12 w-full rounded-lg" />
            <Skeleton className="h-12 w-full rounded-lg" />
          </>
        ) : (
          <>
            {/* Events */}
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Events
              </p>
              {hasEvents ? (
                <ul className="space-y-2">
                  {events.slice(0, 5).map((ev) => (
                    <li
                      key={ev.id}
                      className={cn(
                        'flex items-center gap-3 rounded-lg border border-border px-3 py-2 transition-colors hover:bg-secondary/50',
                        ev.isFocusBlock && 'border-primary/40 bg-primary/5'
                      )}
                    >
                      <Clock className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">{ev.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatTime(ev.start)}
                          {ev.end ? ` – ${formatTime(ev.end)}` : ''}
                          {ev.isFocusBlock ? ' · Focus block' : ''}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="rounded-lg border border-dashed border-border bg-muted/30 py-8 text-center">
                  <Calendar className="mx-auto h-10 w-10 text-muted-foreground/60" aria-hidden />
                  <p className="mt-2 text-sm font-medium text-muted-foreground">No events today</p>
                  <p className="mt-1 text-xs text-muted-foreground">Connect your calendar in Settings to see events here.</p>
                  <Button variant="outline" size="sm" className="mt-4" asChild>
                    <Link to="/dashboard/settings">Settings</Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Quick tasks */}
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                Quick tasks
              </p>
              {hasTasks ? (
                <ul className="space-y-1">
                  {quickTasks.slice(0, 5).map((t) => (
                    <li key={t.id} className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onTaskToggle?.(t.id, !t.done)}
                        className={cn(
                          'flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-border transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                          t.done && 'bg-primary/20 border-primary/40'
                        )}
                        aria-label={t.done ? 'Mark incomplete' : 'Mark complete'}
                      >
                        <CheckSquare
                          className={cn('h-4 w-4', t.done ? 'text-primary' : 'text-muted-foreground')}
                        />
                      </button>
                      <span
                        className={cn(
                          'text-sm',
                          t.done && 'text-muted-foreground line-through'
                        )}
                      >
                        {t.label}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="rounded-lg border border-dashed border-border bg-muted/30 py-4 text-center text-sm text-muted-foreground">
                  No quick tasks. Open Calendar to add focus blocks or tasks.
                </div>
              )}
            </div>

            <Button variant="outline" className="w-full" asChild>
              <Link to="/dashboard/calendar">Open Calendar</Link>
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}
