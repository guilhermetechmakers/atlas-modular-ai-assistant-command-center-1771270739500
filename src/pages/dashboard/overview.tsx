import { FolderGit2, FileText, Calendar, Wallet, Bot } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const metricCards = [
  { title: 'GitHub', desc: 'Repos & issues', icon: FolderGit2, href: '/dashboard/projects', value: '—', trend: null },
  { title: 'Content', desc: 'Drafts & ideas', icon: FileText, href: '/dashboard/content', value: '—', trend: null },
  { title: 'Today', desc: 'Calendar & tasks', icon: Calendar, href: '/dashboard/calendar', value: '—', trend: null },
  { title: 'Finance', desc: 'Runway & budget', icon: Wallet, href: '/dashboard/finance', value: '—', trend: null },
]

export function DashboardOverview() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white md:text-3xl">Command Center</h1>
        <p className="mt-1 text-muted-foreground">
          Your daily summary and agent prompts.
        </p>
      </div>

      {/* Today panel + quick actions */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Today</CardTitle>
            <CardDescription>Upcoming events and suggested actions.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Connect Google Calendar to see events. Ask &quot;What should I do today?&quot; for agent suggestions.
            </p>
            <Button className="mt-4" asChild>
              <a href="/dashboard/calendar">Open Calendar</a>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button variant="outline" className="justify-start" asChild>
              <a href="/dashboard/agents">Ask an agent</a>
            </Button>
            <Button variant="outline" className="justify-start" asChild>
              <a href="/dashboard/content">New content idea</a>
            </Button>
            <Button variant="outline" className="justify-start" asChild>
              <a href="/admin/audit">View audit log</a>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Metric cards - bento style */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metricCards.map((item, i) => (
          <Card
            key={item.title}
            className={cn(
              'transition-all duration-200 hover:scale-[1.02] hover:shadow-card-hover',
              'animate-fade-in'
            )}
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {item.title}
              </CardTitle>
              <item.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{item.value}</div>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
              <Button variant="ghost" size="sm" className="mt-2 -ml-2" asChild>
                <a href={item.href}>View</a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Agent activity feed */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            Agent activity
          </CardTitle>
          <CardDescription>
            Recent agent suggestions and pending approvals.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border bg-secondary/30 p-6 text-center text-sm text-muted-foreground">
            No recent activity. Run a prompt from Agent Builder or Quick actions.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
