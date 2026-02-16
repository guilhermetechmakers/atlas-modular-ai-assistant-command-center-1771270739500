import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  FolderGit2,
  FileText,
  BookOpen,
  Calendar,
  Wallet,
  Bot,
  Settings,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Menu,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'

const SIDEBAR_STORAGE_KEY = 'atlas-sidebar-collapsed'

const mainNav = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/dashboard/projects', label: 'Projects', icon: FolderGit2 },
  { to: '/dashboard/content', label: 'Content Pipeline', icon: FileText },
  { to: '/dashboard/research', label: 'Research & KB', icon: BookOpen },
  { to: '/dashboard/calendar', label: 'Calendar & Travel', icon: Calendar },
  { to: '/dashboard/finance', label: 'Finance Cockpit', icon: Wallet },
  { to: '/dashboard/agents', label: 'Agent Builder', icon: Bot },
]

const bottomNav = [
  { to: '/dashboard/settings/preferences', label: 'Settings', icon: Settings },
  { to: '/help', label: 'About & Help', icon: HelpCircle },
]

function SidebarContent({ collapsed }: { collapsed: boolean }) {
  const location = useLocation()
  return (
    <>
      <div className="flex h-14 items-center border-b border-border px-4">
        {!collapsed && (
          <span className="text-lg font-bold tracking-tight text-white">
            Atlas
          </span>
        )}
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {mainNav.map((item) => {
          const isActive = location.pathname === item.to
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary border-l-2 border-primary -ml-[2px] pl-[14px]'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          )
        })}
      </nav>
      <div className="border-t border-border p-3">
        {bottomNav.map((item) => {
          const isActive = location.pathname === item.to
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          )
        })}
      </div>
    </>
  )
}

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem(SIDEBAR_STORAGE_KEY) === 'true'
    } catch {
      return false
    }
  })

  const toggleCollapsed = () => {
    const next = !collapsed
    setCollapsed(next)
    try {
      localStorage.setItem(SIDEBAR_STORAGE_KEY, String(next))
    } catch {
      // ignore
    }
  }

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          'hidden border-r border-border bg-[rgb(35,35,38)] md:flex md:flex-col md:transition-[width] duration-300',
          collapsed ? 'w-[72px]' : 'w-64'
        )}
      >
        <SidebarContent collapsed={collapsed} />
        <div className="border-t border-border p-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapsed}
            className="w-full"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </aside>
      {/* Mobile: sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent collapsed={false} />
        </SheetContent>
      </Sheet>
    </>
  )
}
