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
  className?: string
  id?: string
}

export function CreateWorkspaceFlow({
  value,
  onChange,
  error,
  disabled = false,
  placeholder = 'My Workspace',
  className,
  id = 'workspace-name',
}: CreateWorkspaceFlowProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={id}>Workspace name</Label>
      <div className="relative">
        <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id={id}
          type="text"
          autoComplete="organization"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="pl-9 transition-colors focus-visible:ring-2 focus-visible:ring-primary"
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      </div>
      {error && (
        <p id={`${id}-error`} className="text-sm text-destructive animate-fade-in">
          {error}
        </p>
      )}
    </div>
  )
}
