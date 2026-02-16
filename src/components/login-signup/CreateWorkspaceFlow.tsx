import { Building2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

export interface CreateWorkspaceFlowProps {
  value: string
  onChange: (value: string) => void
  error?: string
  disabled?: boolean
  placeholder?: string
  id?: string
  className?: string
}

/**
 * Workspace name input for first-time signup flow.
 * Used when the user is creating an account and needs to name their workspace.
 */
export function CreateWorkspaceFlow({
  value,
  onChange,
  error,
  disabled = false,
  placeholder = 'My Workspace',
  id = 'workspace-name',
  className,
}: CreateWorkspaceFlowProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={id}>Workspace name</Label>
      <div className="relative">
        <Building2
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <Input
          id={id}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={cn(
            'pl-9 transition-colors duration-200 focus-visible:ring-2',
            error && 'border-destructive focus-visible:ring-destructive'
          )}
          autoComplete="organization"
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      </div>
      {error && (
        <p id={`${id}-error`} className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
