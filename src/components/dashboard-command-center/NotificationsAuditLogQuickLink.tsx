import { Link } from 'react-router-dom'
import { Bell, FileCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface NotificationsAuditLogQuickLinkProps {
  className?: string
}

export function NotificationsAuditLogQuickLink({ className }: NotificationsAuditLogQuickLinkProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Button variant="ghost" size="sm" asChild aria-label="Notifications">
        <Link to="/dashboard/settings" className="flex items-center gap-2">
          <Bell className="h-4 w-4" />
          <span className="hidden sm:inline">Notifications</span>
        </Link>
      </Button>
      <Button variant="ghost" size="sm" asChild aria-label="Audit log">
        <Link to="/admin/audit" className="flex items-center gap-2">
          <FileCheck className="h-4 w-4" />
          <span className="hidden sm:inline">Audit log</span>
        </Link>
      </Button>
    </div>
  )
}
