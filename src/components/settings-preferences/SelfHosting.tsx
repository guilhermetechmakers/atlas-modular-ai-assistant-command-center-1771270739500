import { Server, BookOpen, RefreshCw } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface SelfHostingProps {
  isLoading?: boolean
}

function SelfHostingSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="h-6 w-40 animate-pulse rounded bg-muted" />
        <div className="mt-1 h-4 w-72 animate-pulse rounded bg-muted" />
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="h-4 w-full animate-pulse rounded bg-muted" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
        <div className="h-10 w-36 animate-pulse rounded-lg bg-muted" />
      </CardContent>
    </Card>
  )
}

export function SelfHosting({ isLoading }: SelfHostingProps) {
  if (isLoading) return <SelfHostingSkeleton />

  return (
    <Card className="transition-all duration-200 hover:shadow-card-hover">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Server className="h-5 w-5" />
          Self-hosting
        </CardTitle>
        <CardDescription>
          Docker deployment docs and update controls for self-hosted Atlas instances.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-lg border border-border bg-card/50 p-4">
          <h4 className="flex items-center gap-2 font-medium text-foreground">
            <BookOpen className="h-4 w-4" />
            Docker deployment
          </h4>
          <p className="mt-2 text-sm text-muted-foreground">
            Run Atlas with Docker Compose. See the self-host guide for prerequisites, environment variables, and backup setup.
          </p>
          <Button variant="outline" className="mt-4 gap-2 transition-transform hover:scale-[1.02]" asChild>
            <a href="/help">View self-host guide</a>
          </Button>
        </div>
        <div className="rounded-lg border border-border bg-card/50 p-4">
          <h4 className="flex items-center gap-2 font-medium text-foreground">
            <RefreshCw className="h-4 w-4" />
            Update controls
          </h4>
          <p className="mt-2 text-sm text-muted-foreground">
            Check for updates and apply them from the admin panel or via Docker pull. Backup your data before upgrading.
          </p>
          <Button variant="outline" className="mt-4 gap-2 transition-transform hover:scale-[1.02]">
            Check for updates
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
