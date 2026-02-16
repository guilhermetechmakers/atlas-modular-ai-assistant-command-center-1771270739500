import { Shield } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'

export interface SSOMFACTAProps {
  /** Whether two-factor is enabled. Disabled by default per spec. */
  twoFactorEnabled?: boolean
  onTwoFactorChange?: (enabled: boolean) => void
  /** Whether the switch is disabled (e.g. not yet implemented). Default true so toggle is disabled by default. */
  disabled?: boolean
  className?: string
}

/**
 * SSO & MFA CTA: enable two-factor toggle (disabled by default).
 */
export function SSOMFACTA({
  twoFactorEnabled = false,
  onTwoFactorChange,
  disabled = true,
  className,
}: SSOMFACTAProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between rounded-lg border border-border bg-muted/30 px-4 py-3',
        className
      )}
    >
      <div className="flex items-center gap-3">
        <Shield className="h-5 w-5 text-muted-foreground" aria-hidden />
        <div>
          <Label
            htmlFor="mfa-toggle"
            className="text-sm font-medium cursor-pointer"
          >
            Two-factor authentication
          </Label>
          <p className="text-xs text-muted-foreground mt-0.5">
            Add an extra layer of security (coming soon)
          </p>
        </div>
      </div>
      <Switch
        id="mfa-toggle"
        checked={twoFactorEnabled}
        onCheckedChange={onTwoFactorChange}
        disabled={disabled}
        aria-label="Enable two-factor authentication"
      />
    </div>
  )
}
