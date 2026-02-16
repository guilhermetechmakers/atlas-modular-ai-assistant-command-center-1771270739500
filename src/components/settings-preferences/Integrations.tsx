import { useState } from 'react'
import { Link2, Github, Calendar, Key, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { IntegrationItem } from '@/types/preferences'

const defaultIntegrations: IntegrationItem[] = [
  { id: '1', provider: 'github', connected: false, display_name: 'GitHub' },
  { id: '2', provider: 'google_calendar', connected: false, display_name: 'Google Calendar' },
]

interface IntegrationsProps {
  integrations?: IntegrationItem[] | null
  isLoading?: boolean
}

function IntegrationsSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="h-6 w-36 animate-pulse rounded bg-muted" />
        <div className="mt-1 h-4 w-64 animate-pulse rounded bg-muted" />
      </CardHeader>
      <CardContent className="space-y-3">
        {[1, 2].map((i) => (
          <div key={i} className="flex h-14 items-center justify-between rounded-lg border border-border bg-card p-3">
            <div className="h-5 w-24 animate-pulse rounded bg-muted" />
            <div className="h-9 w-28 animate-pulse rounded bg-muted" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export function Integrations({ integrations = defaultIntegrations, isLoading }: IntegrationsProps) {
  const initialItems: IntegrationItem[] = integrations ?? defaultIntegrations
  const [items, setItems] = useState<IntegrationItem[]>(initialItems)
  const [connecting, setConnecting] = useState<string | null>(null)

  const handleConnect = async (id: string) => {
    setConnecting(id)
    try {
      await new Promise((r) => setTimeout(r, 800))
      setItems((prev) =>
        prev.map((p) => (p.id === id ? { ...p, connected: true } : p))
      )
      toast.success('Integration connected.')
    } catch {
      toast.error('Connection failed. Please try again.')
    } finally {
      setConnecting(null)
    }
  }

  const handleDisconnect = (id: string) => {
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, connected: false } : p))
    )
    toast.success('Integration disconnected.')
  }

  if (isLoading) return <IntegrationsSkeleton />

  return (
    <Card className="transition-all duration-200 hover:shadow-card-hover">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Link2 className="h-5 w-5" />
          Integrations
        </CardTitle>
        <CardDescription>
          GitHub, Google Calendar, and other connectors. OAuth tokens are stored encrypted.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className={cn(
                'flex flex-col gap-2 rounded-xl border border-border bg-card/50 p-4 transition-all duration-200',
                'sm:flex-row sm:items-center sm:justify-between',
                'hover:border-primary/30 hover:shadow-sm'
              )}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  {item.provider === 'github' ? (
                    <Github className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-foreground">{item.display_name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.connected ? 'Connected' : 'Not connected'}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                {item.connected ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDisconnect(item.id)}
                    className="gap-1 transition-transform hover:scale-[1.02]"
                  >
                    <Trash2 className="h-4 w-4" />
                    Disconnect
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    onClick={() => handleConnect(item.id)}
                    disabled={connecting === item.id}
                    className="gap-1 transition-transform hover:scale-[1.02]"
                  >
                    {connecting === item.id ? 'Connecting…' : (
                      <>
                        <Plus className="h-4 w-4" />
                        Connect
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-lg border border-dashed border-border p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Key className="h-4 w-4" />
            <span>OAuth tokens and connector management are handled securely. Add more connectors from the admin panel.</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
