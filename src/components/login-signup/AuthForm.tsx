import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Lock, Building2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
})

const signupSchema = z
  .object({
    email: z.string().email('Invalid email'),
    password: z.string().min(8, 'At least 8 characters'),
    confirmPassword: z.string(),
    workspaceName: z.string().min(1, 'Workspace name is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type LoginFormData = z.infer<typeof loginSchema>
export type SignupFormData = z.infer<typeof signupSchema>

export type AuthFormMode = 'login' | 'signup'

export interface AuthFormProps {
  mode: AuthFormMode
  onSubmitLogin: (data: LoginFormData) => void | Promise<void>
  onSubmitSignup: (data: SignupFormData) => void | Promise<void>
  isSubmitting?: boolean
  className?: string
}

export function AuthForm({
  mode,
  onSubmitLogin,
  onSubmitSignup,
  isSubmitting = false,
  className,
}: AuthFormProps) {
  const isLogin = mode === 'login'

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      workspaceName: '',
    },
  })

  const handleLogin = loginForm.handleSubmit((data) => onSubmitLogin(data))
  const handleSignup = signupForm.handleSubmit((data) => onSubmitSignup(data))

  if (isLogin) {
    const { register, formState: { errors } } = loginForm
    return (
      <form
        onSubmit={handleLogin}
        className={cn('space-y-4', className)}
        noValidate
      >
        <div className="space-y-2">
          <Label htmlFor="auth-email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <Input
              id="auth-email"
              type="email"
              placeholder="you@example.com"
              className={cn('pl-9', errors.email && 'border-destructive focus-visible:ring-destructive')}
              autoComplete="email"
              {...register('email')}
            />
          </div>
          {errors.email && (
            <p className="text-sm text-destructive" role="alert">{errors.email.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="auth-password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <Input
              id="auth-password"
              type="password"
              placeholder="••••••••"
              className={cn('pl-9', errors.password && 'border-destructive focus-visible:ring-destructive')}
              autoComplete="current-password"
              {...register('password')}
            />
          </div>
          {errors.password && (
            <p className="text-sm text-destructive" role="alert">{errors.password.message}</p>
          )}
        </div>
        <div className="flex justify-end">
          <Link
            to="/password-reset"
            className="text-sm text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
          >
            Forgot password?
          </Link>
        </div>
        <Button type="submit" className="w-full min-h-[44px]" disabled={isSubmitting}>
          {isSubmitting ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
    )
  }

  const { register, formState: { errors } } = signupForm
  return (
    <form
      onSubmit={handleSignup}
      className={cn('space-y-4', className)}
      noValidate
    >
      <div className="space-y-2">
        <Label htmlFor="signup-email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Input
            id="signup-email"
            type="email"
            placeholder="you@example.com"
            className={cn('pl-9', errors.email && 'border-destructive focus-visible:ring-destructive')}
            autoComplete="email"
            {...register('email')}
          />
        </div>
        {errors.email && (
          <p className="text-sm text-destructive" role="alert">{errors.email.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-workspace">Workspace name</Label>
        <div className="relative">
          <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Input
            id="signup-workspace"
            placeholder="My Workspace"
            className={cn('pl-9', errors.workspaceName && 'border-destructive focus-visible:ring-destructive')}
            autoComplete="organization"
            {...register('workspaceName')}
          />
        </div>
        {errors.workspaceName && (
          <p className="text-sm text-destructive" role="alert">{errors.workspaceName.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Input
            id="signup-password"
            type="password"
            placeholder="••••••••"
            className={cn('pl-9', errors.password && 'border-destructive focus-visible:ring-destructive')}
            autoComplete="new-password"
            {...register('password')}
          />
        </div>
        {errors.password && (
          <p className="text-sm text-destructive" role="alert">{errors.password.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-confirm">Confirm password</Label>
        <Input
          id="signup-confirm"
          type="password"
          placeholder="••••••••"
          className={errors.confirmPassword ? 'border-destructive focus-visible:ring-destructive' : undefined}
          autoComplete="new-password"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-destructive animate-shake" role="alert">{errors.confirmPassword.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full min-h-[44px]" disabled={isSubmitting}>
        {isSubmitting ? 'Creating account…' : 'Create account'}
      </Button>
    </form>
  )
}
