import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FolderGit2, GitCommit, GitPullRequest, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import type { GitHubSummaryItem } from '@/types/command-center'

export interface GitHubSummaryCardProps {
  items: GitHubSummaryItem[]
  repos: string[]
  isLoading?: boolean
}

const typeIcons = {
  commit: GitCommit,
  pr: GitPullRequest,
  issue: AlertCircle,
}

export function GitHubSummaryCard({
  items,
  repos,
  isLoading,
}: GitHubSummaryCardProps) {
  const [selectedRepo, setSelectedRepo] = useState<string>('all')
  const filtered =
    selectedRepo === 'all'
      ? items
      : items.filter((i) => i.repo === selectedRepo)
  const displayItems = filtered.slice(0, 8)

  return (
    <Card className="transition-all duration-200 hover:shadow-card-hover border-border">
      <CardHeader className="pb-2">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FolderGit2 className="h-5 w-5 text-primary" />
              GitHub
            </CardTitle>
            <CardDescription>Recent commits, PRs, and issues.</CardDescription>
          </div>
          {repos.length > 0 && (
            <select
              value={selectedRepo}
              onChange={(e) => setSelectedRepo(e.target.value)}
              className="h-9 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Filter by repository"
            >
              <option value="all">All repos</option>
              {repos.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-12 w-full rounded-lg" />
            ))}
          </div>
        ) : displayItems.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border py-8 text-center text-sm text-muted-foreground">
            <FolderGit2 className="mx-auto h-10 w-10 opacity-50" />
            <p className="mt-2">No activity yet.</p>
            <p className="mt-1">Connect GitHub in Settings to see commits, PRs, and issues.</p>
            <Button variant="outline" size="sm" className="mt-4" asChild>
              <Link to="/dashboard/projects">View Projects</Link>
            </Button>
          </div>
        ) : (
          <ul className="space-y-2">
            {displayItems.map((item) => {
              const Icon = typeIcons[item.type]
              return (
                <li key={item.id}>
                  <a
                    href={item.href ?? '#'}
                    className={cn(
                      'flex items-center gap-3 rounded-lg border border-transparent px-3 py-2 transition-colors hover:bg-secondary/50 hover:border-border'
                    )}
                  >
                    {Icon && <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{item.title}</p>
                      {(item.repo || item.created_at) && (
                        <p className="text-xs text-muted-foreground">
                          {item.repo}
                          {item.repo && item.created_at ? ' · ' : ''}
                          {item.created_at}
                        </p>
                      )}
                    </div>
                  </a>
                </li>
              )
            })}
          </ul>
        )}
        {items.length > 0 && (
          <Button variant="ghost" size="sm" className="mt-2 w-full" asChild>
            <Link to="/dashboard/projects">View all</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
