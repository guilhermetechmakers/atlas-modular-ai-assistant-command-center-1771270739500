import { FileText, Lightbulb, Calendar } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function ContentPipelinePage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white md:text-3xl">Content Pipeline</h1>
        <p className="mt-1 text-muted-foreground">
          Ideas → drafts → schedule → publish. Repurpose tool and scheduler.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="transition-all duration-200 hover:scale-[1.02] hover:shadow-card-hover">
          <CardHeader>
            <Lightbulb className="h-8 w-8 text-primary" />
            <CardTitle>Ideas</CardTitle>
            <CardDescription>Capture and prioritize content ideas.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">Add idea</Button>
          </CardContent>
        </Card>
        <Card className="transition-all duration-200 hover:scale-[1.02] hover:shadow-card-hover">
          <CardHeader>
            <FileText className="h-8 w-8 text-primary" />
            <CardTitle>Drafts</CardTitle>
            <CardDescription>WYSIWYG/Markdown editor with version history.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">New draft</Button>
          </CardContent>
        </Card>
        <Card className="transition-all duration-200 hover:scale-[1.02] hover:shadow-card-hover">
          <CardHeader>
            <Calendar className="h-8 w-8 text-primary" />
            <CardTitle>Content calendar</CardTitle>
            <CardDescription>Schedule and plan publishing.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">View calendar</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent drafts</CardTitle>
          <CardDescription>Your content lifecycle in one place.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-12 text-center text-sm text-muted-foreground">
            No drafts yet. Add an idea or create a new draft to get started.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
