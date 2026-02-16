import { Bot, Plus, Settings, Wrench } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function AgentsPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white md:text-3xl">Agent Builder & Skills</h1>
          <p className="mt-1 text-muted-foreground">
            Create custom agents, manage skills, memory, and approval policies.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New agent
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              Domain agents
            </CardTitle>
            <CardDescription>
              PM, Personal, Social, Research, Finance. Each has instructions, memory, and allowlisted skills.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Create custom agents with the Agent Builder. Use the Test Console to run prompts and review logs.</p>
              <Button variant="outline" size="sm">Open Test Console</Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-primary" />
              Skill registry
            </CardTitle>
            <CardDescription>
              Approved skills: GitHub, Google Calendar, Web, Files, DB. Admin approval required for new skills.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" asChild>
              <a href="/admin">View approval queue</a>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Approval policy</CardTitle>
          <CardDescription>
            Human-in-the-loop for destructive or write actions. Configure in agent settings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Edit approval settings
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
