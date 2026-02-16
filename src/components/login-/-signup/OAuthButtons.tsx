import { Github, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface OAuthButtonsProps {
  onGitHub?: () => void
  onGoogle?: () => void
  onSSO?: () => void
  disabled?: boolean
  className?: string
}

export function OAuthButtons({
  onGitHub,
  onGoogle,
  onSSO,
  disabled = false,
  className,
}: OAuthButtonsProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <p className="relative text-center text-xs uppercase text-muted-foreground before:absolute before:left-0 before:top-1/2 before:h-px before:w-full before:border-t before:border-border before:content-['']">
        <span className="relative z-10 bg-card px-2">Or continue with</span>
      </p>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <Button
          type="button"
          variant="outline"
          className="min-h-[44px] w-full transition-all duration-200 hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
          onClick={onGitHub}
          disabled={disabled}
          aria-label="Sign in with GitHub"
        >
          <Github className="mr-2 h-5 w-5" />
          GitHub
        </Button>
        <Button
          type="button"
          variant="outline"
          className="min-h-[44px] w-full transition-all duration-200 hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
          onClick={onGoogle}
          disabled={disabled}
          aria-label="Sign in with Google (Calendar)"
        >
          <Calendar className="mr-2 h-5 w-5" />
          Google
        </Button>
      </div>
      <Button
        type="button"
        variant="ghost"
        className="w-full min-h-[44px] text-muted-foreground transition-all duration-200 hover:scale-[1.01]"
        onClick={onSSO}
        disabled={disabled}
        aria-label="Sign in with SSO (optional)"
      >
        SSO (optional)
      </Button>
    </div>
  )
}
