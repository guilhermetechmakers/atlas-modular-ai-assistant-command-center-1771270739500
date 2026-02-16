import { FolderGit2, Plus, List, LayoutGrid } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function ProjectsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white md:text-3xl">Projects</h1>
          <p className="mt-1 text-muted-foreground">
            Repo explorer and project management mapped to GitHub.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create issue
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Repositories</CardTitle>
          <CardDescription>
            Connect GitHub to see your repos. Select a repo to view issues and roadmap.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input placeholder="Search repos..." className="max-w-sm" />
            <div className="flex rounded-lg border border-border p-1">
              <Button variant="ghost" size="icon">
                <List className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <LayoutGrid className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16 text-center">
            <FolderGit2 className="h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-sm font-medium text-white">No repositories linked</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Connect GitHub in Settings to sync your repos and issues.
            </p>
            <Button variant="outline" className="mt-4" asChild>
              <a href="/dashboard/settings">Open Settings</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
