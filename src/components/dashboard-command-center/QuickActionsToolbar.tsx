import { Link } from 'react-router-dom'
import { FileText, Bot, Upload, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface QuickActionsToolbarProps {
  className?: string
}

const actions = [
  { label: 'Create issue', icon: AlertCircle, href: '/dashboard/projects' },
  { label: 'New note', icon: FileText, href: '/dashboard/content' },
  { label: 'Create agent', icon: Bot, href: '/dashboard/agents' },
  { label: 'Import CSV', icon: Upload, href: '/dashboard/finance' },
]

export function QuickActionsToolbar({ className }: QuickActionsToolbarProps) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-2 rounded-xl border border-border bg-card/50 p-2 transition-shadow duration-200 hover:shadow-md',
        className
      )}
      role="toolbar"
      aria-label="Quick actions: create issue, new note, create agent, import CSV"
    >
      {actions.map((action) => {
        const Icon = action.icon
        return (
          <Button
            key={action.label}
            variant="outline"
            size="sm"
            className="transition-all duration-200 hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
            asChild
          >
            <Link to={action.href} className="flex items-center gap-2">
              <Icon className="h-4 w-4 shrink-0" aria-hidden />
              {action.label}
            </Link>
          </Button>
        )
      })}
    </div>
  )
}
