import { useState } from 'react'
import { Shield, Key, Smartphone, LogOut, Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import type { ApiKeyItem, SessionItem } from '@/types/preferences'

const passwordSchema = z
  .object({
    current_password: z.string().min(1, 'Current password is required'),
    new_password: z.string().min(8, 'Password must be at least 8 characters'),
    confirm_password: z.string(),
  })
  .refine((d) => d.new_password === d.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  })

type PasswordSchema = z.infer<typeof passwordSchema>

const mockApiKeys: ApiKeyItem[] = [
  { id: '1', name: 'CLI', last_four: 'a1b2', created_at: '2025-01-15' },
]
const mockSessions: SessionItem[] = [
  { id: '1', device: 'Chrome on Linux', last_active: new Date().toISOString(), current: true },
  { id: '2', device: 'Safari on macOS', last_active: '2025-02-10T12:00:00Z', current: false },
]

interface SecurityProps {
  apiKeys?: ApiKeyItem[] | null
  sessions?: SessionItem[] | null
  isLoading?: boolean
}

function SecuritySkeleton() {
  return (
    <>
      <Card>
        <CardHeader>
          <div className="h-6 w-28 animate-pulse rounded bg-muted" />
          <div className="mt-1 h-4 w-48 animate-pulse rounded bg-muted" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-10 w-full animate-pulse rounded-lg bg-muted" />
          <div className="h-10 w-full animate-pulse rounded-lg bg-muted" />
          <div className="h-10 w-24 animate-pulse rounded-lg bg-muted" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <div className="h-6 w-24 animate-pulse rounded bg-muted" />
        </CardHeader>
        <CardContent>
          <div className="h-20 animate-pulse rounded bg-muted" />
        </CardContent>
      </Card>
    </>
  )
}

export function Security({ apiKeys = mockApiKeys, sessions = mockSessions, isLoading }: SecurityProps) {
  const [twoFaEnabled, setTwoFaEnabled] = useState(false)
  const [passwordSubmitting, setPasswordSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordSchema>({
    resolver: zodResolver(passwordSchema),
  })

  const onPasswordSubmit = async () => {
    setPasswordSubmitting(true)
    try {
      await new Promise((r) => setTimeout(r, 700))
      reset()
      toast.success('Password updated successfully.')
    } catch {
      toast.error('Failed to update password. Please try again.')
    } finally {
      setPasswordSubmitting(false)
    }
  }

  const revokeSession = (_id: string) => {
    toast.success('Session revoked.')
  }

  if (isLoading) return <SecuritySkeleton />

  return (
    <div className="space-y-6">
      <Card className="transition-all duration-200 hover:shadow-card-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Change password
          </CardTitle>
          <CardDescription>Update your account password. You will need to sign in again after changing.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onPasswordSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current password</Label>
              <Input
                id="current-password"
                type="password"
                autoComplete="current-password"
                {...register('current_password')}
                className={cn(errors.current_password && 'border-destructive focus-visible:ring-destructive')}
                aria-invalid={!!errors.current_password}
              />
              {errors.current_password && (
                <p className="text-sm text-destructive" role="alert">{errors.current_password.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New password</Label>
              <Input
                id="new-password"
                type="password"
                autoComplete="new-password"
                {...register('new_password')}
                className={cn(errors.new_password && 'border-destructive focus-visible:ring-destructive')}
                aria-invalid={!!errors.new_password}
              />
              {errors.new_password && (
                <p className="text-sm text-destructive" role="alert">{errors.new_password.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm new password</Label>
              <Input
                id="confirm-password"
                type="password"
                autoComplete="new-password"
                {...register('confirm_password')}
                className={cn(errors.confirm_password && 'border-destructive focus-visible:ring-destructive')}
                aria-invalid={!!errors.confirm_password}
              />
              {errors.confirm_password && (
                <p className="text-sm text-destructive" role="alert">{errors.confirm_password.message}</p>
              )}
            </div>
            <Button type="submit" disabled={passwordSubmitting} className="transition-transform hover:scale-[1.02]">
              {passwordSubmitting ? 'Updating…' : 'Update password'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="transition-all duration-200 hover:shadow-card-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Two-factor authentication
          </CardTitle>
          <CardDescription>Add an extra layer of security with 2FA.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center justify-between gap-4">
          <span className="text-sm text-muted-foreground">Enable 2FA</span>
          <Switch
            checked={twoFaEnabled}
            onCheckedChange={setTwoFaEnabled}
            aria-label="Enable two-factor authentication"
          />
        </CardContent>
      </Card>

      <Card className="transition-all duration-200 hover:shadow-card-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            API keys
          </CardTitle>
          <CardDescription>Manage API keys for programmatic access. Keys are shown only once when created.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="space-y-2">
            {(apiKeys ?? mockApiKeys).map((key) => (
              <li
                key={key.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-card/50 px-4 py-3"
              >
                <span className="font-medium">{key.name}</span>
                <span className="text-sm text-muted-foreground">…{key.last_four}</span>
              </li>
            ))}
          </ul>
          <Button variant="outline" size="sm" className="gap-1 transition-transform hover:scale-[1.02]">
            <Plus className="h-4 w-4" />
            Create API key
          </Button>
        </CardContent>
      </Card>

      <Card className="transition-all duration-200 hover:shadow-card-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">Session management</CardTitle>
          <CardDescription>Active sessions and devices. Revoke any session you don’t recognize.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {(sessions ?? mockSessions).map((s) => (
              <li
                key={s.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-border bg-card/50 px-4 py-3"
              >
                <div>
                  <p className="font-medium">{s.device ?? 'Unknown device'}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(s.last_active).toLocaleString()} {s.current && '(current)'}
                  </p>
                </div>
                {!s.current && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => revokeSession(s.id)}
                    className="gap-1 text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    <LogOut className="h-4 w-4" />
                    Revoke
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
