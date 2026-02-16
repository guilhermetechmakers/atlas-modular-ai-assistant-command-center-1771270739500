import { useEffect } from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { Search, Bell, FileCheck } from 'lucide-react'
import { AppSidebar } from '@/components/layout/app-sidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/auth-context'

export function DashboardLayout() {
  const navigate = useNavigate()
  const { user, emailVerified } = useAuth()

  useEffect(() => {
    if (user && !emailVerified) {
      navigate('/verify-email', { replace: true })
    }
  }, [user, emailVerified, navigate])

  if (user && !emailVerified) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="h-8 w-8 animate-pulse rounded-full bg-muted" aria-hidden />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search repos, notes, events..."
                className="h-9 w-full pl-9"
                aria-label="Global search"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/admin/audit" aria-label="Audit logs">
                <FileCheck className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </header>
        <main
          className={cn(
            'flex-1 overflow-auto p-4 md:p-6 lg:p-8',
            'animate-fade-in'
          )}
        >
          <Outlet />
        </main>
      </div>
    </div>
  )
}
