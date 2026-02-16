import { BookOpen, Plus, Search } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function ResearchPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white md:text-3xl">Research & Knowledge Base</h1>
          <p className="mt-1 text-muted-foreground">
            Notes, clips, summaries, and decisions with citations.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New note
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notes</CardTitle>
          <CardDescription>
            Full-text search, tags, and web clipper integration.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search notes..." className="pl-9" />
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-16 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-sm font-medium text-white">No notes yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Create a note or use the web clipper to save clips and summaries.
            </p>
            <Button variant="outline" className="mt-4">Create note</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
