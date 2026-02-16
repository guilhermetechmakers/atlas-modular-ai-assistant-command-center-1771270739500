import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(1, 'Password is required'),
})

const signupSchema = loginSchema.extend({
  confirmPassword: z.string().min(1, 'Confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

export type LoginFormData = z.infer<typeof loginSchema>
export type SignupFormData = z.infer<typeof signupSchema>

export interface AuthFormProps {
  mode: 'login' | 'signup'
  onSubmit: (data: LoginFormData | SignupFormData) => void
  isSubmitting?: boolean
  className?: string
}

export function AuthForm({ mode, onSubmit, isSubmitting = false, className }: AuthFormProps) {
  const schema = mode === 'login' ? loginSchema : signupSchema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData | SignupFormData>({
    resolver: zodResolver(schema),
    defaultValues:
      mode === 'login'
        ? { email: '', password: '' }
        : { email: '', password: '', confirmPassword: '' },
  })

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('space-y-4', className)}
      noValidate
    >
      <div className="space-y-2">
        <Label htmlFor="auth-email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="auth-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="pl-9 transition-colors focus-visible:ring-2 focus-visible:ring-primary"
            {...register('email')}
          />
        </div>
        {errors.email && (
          <p className="text-sm text-destructive animate-fade-in">
            {errors.email.message}
          </p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="auth-password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="auth-password"
            type="password"
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            placeholder="••••••••"
            className="pl-9 transition-colors focus-visible:ring-2 focus-visible:ring-primary"
            {...register('password')}
          />
        </div>
        {errors.password && (
          <p className="text-sm text-destructive animate-fade-in">
            {errors.password.message}
          </p>
        )}
      </div>
      {mode === 'signup' && (
        <div className="space-y-2">
          <Label htmlFor="auth-confirm-password">Confirm password</Label>
          <Input
            id="auth-confirm-password"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            className="transition-colors focus-visible:ring-2 focus-visible:ring-primary"
            {...register('confirmPassword')}
          />
          {'confirmPassword' in errors && errors.confirmPassword && (
            <p className="text-sm text-destructive animate-fade-in">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      )}
      <Button
        type="submit"
        className="w-full min-h-[44px] transition-all duration-200 hover:scale-[1.02] hover:shadow-glow active:scale-[0.98] disabled:opacity-70"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="inline-flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
            {mode === 'login' ? 'Signing in…' : 'Creating account…'}
          </span>
        ) : mode === 'login' ? (
          'Sign in'
        ) : (
          'Create account'
        )}
      </Button>
    </form>
  )
}
