import { Shield } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

export interface SsoMfaCtaProps {
  /** Two-factor enabled; toggle is disabled by default (false). */
  twoFactorEnabled?: boolean
  onTwoFactorChange?: (enabled: boolean) => void
  /** When true, the toggle is disabled (default). */
  disabled?: boolean
  className?: string
}

export function SsoMfaCta({
  twoFactorEnabled = false,
  onTwoFactorChange,
  disabled = true,
  className,
}: SsoMfaCtaProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between rounded-lg border border-border bg-muted/30 p-4 transition-all duration-200',
        className
      )}
    >
      <div className="flex items-center gap-3">
        <Shield className="h-5 w-5 text-muted-foreground" aria-hidden />
        <div className="space-y-0.5">
          <Label htmlFor="mfa-toggle" className="text-sm font-medium cursor-default">
            Two-factor authentication
          </Label>
          <p className="text-xs text-muted-foreground">
            Add an extra layer of security (SSO & MFA)
          </p>
        </div>
      </div>
      <Switch
        id="mfa-toggle"
        checked={twoFactorEnabled}
        onCheckedChange={onTwoFactorChange}
        disabled={disabled}
        aria-label="Enable two-factor authentication"
        className="data-[state=checked]:bg-primary"
      />
    </div>
  )
}
