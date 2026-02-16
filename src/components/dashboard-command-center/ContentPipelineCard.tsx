import { Link } from 'react-router-dom'
import { FileText, Calendar } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import type { ContentPipelineItem } from '@/types/command-center'

export interface ContentPipelineCardProps {
  items: ContentPipelineItem[]
  isLoading?: boolean
}

export function ContentPipelineCard({ items, isLoading }: ContentPipelineCardProps) {
  const drafts = items.filter((i) => i.type === 'draft')
  const scheduled = items.filter((i) => i.type === 'scheduled')
  const dueDrafts = drafts.filter((d) => d.due)
  const displayScheduled = scheduled.slice(0, 3)

  return (
    <Card className="transition-all duration-200 hover:shadow-card-hover border-border">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <FileText className="h-5 w-5 text-primary" />
          Content Pipeline
        </CardTitle>
        <CardDescription>Due drafts, scheduled posts, and quick-create ideas.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-14 w-full rounded-lg" />
            <Skeleton className="h-14 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        ) : (
          <>
            {dueDrafts.length > 0 && (
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Due drafts
                </p>
                <ul className="space-y-1">
                  {dueDrafts.slice(0, 3).map((d) => (
                    <li key={d.id}>
                      <a
                        href={d.href ?? '#'}
                        className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-secondary/50"
                      >
                        <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                        <span className="truncate">{d.title}</span>
                        {d.due && (
                          <span className="ml-auto shrink-0 text-xs text-muted-foreground">
                            {d.due}
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {displayScheduled.length > 0 && (
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Scheduled
                </p>
                <ul className="space-y-1">
                  {displayScheduled.map((s) => (
                    <li key={s.id}>
                      <a
                        href={s.href ?? '#'}
                        className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm hover:bg-secondary/50"
                      >
                        <Calendar className="h-4 w-4 shrink-0 text-muted-foreground" />
                        <span className="truncate">{s.title}</span>
                        {s.due && (
                          <span className="ml-auto text-xs text-muted-foreground">{s.due}</span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {items.length === 0 && (
              <div className="rounded-lg border border-dashed border-border py-6 text-center text-sm text-muted-foreground">
                No drafts or scheduled posts. Add an idea to get started.
              </div>
            )}
            <div className="flex flex-wrap gap-2 pt-2">
              <Button variant="outline" size="sm" asChild>
                <Link to="/dashboard/content">New draft</Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link to="/dashboard/content">Quick-create idea</Link>
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
