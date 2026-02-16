import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useAuth } from '@/contexts/auth-context'
import { login as apiLogin, signup as apiSignup } from '@/api/auth'
import {
  AuthForm,
  OAuthButtons,
  SSOMFACTA,
  FooterLinks,
} from '@/components/login-signup'
import type { LoginFormData, SignupFormData } from '@/components/login-signup'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type Mode = 'login' | 'signup'

const PAGE_TITLE = 'Login & Sign up | Atlas'

export default function LoginSignupPage() {
  const navigate = useNavigate()
  const { setUser } = useAuth()
  const [mode, setMode] = useState<Mode>('login')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)

  useEffect(() => {
    document.title = PAGE_TITLE
    return () => {
      document.title = 'Atlas'
    }
  }, [])

  const handleLogin = async (data: LoginFormData) => {
    setIsSubmitting(true)
    try {
      const session = await apiLogin({ email: data.email, password: data.password })
      setUser(session.user)
      toast.success('Welcome back.')
      if (session.user.emailVerified) {
        navigate('/dashboard')
      } else {
        navigate('/verify-email')
      }
    } catch {
      toast.error('Invalid email or password.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSignup = async (data: SignupFormData) => {
    setIsSubmitting(true)
    try {
      const session = await apiSignup({
        email: data.email,
        password: data.password,
        workspaceName: data.workspaceName,
      })
      setUser(session.user)
      toast.success('Account created. Check your email to verify.')
      navigate('/verify-email')
    } catch {
      toast.error('Sign up failed. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleOAuth = (provider: 'github' | 'google' | 'sso') => {
    if (provider === 'sso') {
      toast.info('SSO coming soon.')
      return
    }
    toast.info(`${provider === 'github' ? 'GitHub' : 'Google'} sign-in will be configured by your backend.`)
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background p-4">
      {/* Animated gradient background */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-1/2 -right-1/2 h-full w-1/2 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-1/2 -left-1/2 h-full w-1/2 rounded-full bg-accent/10 blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-md">
        <Card className="animate-scale-in border-border bg-card/95 shadow-card backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold tracking-tight text-white">
              {mode === 'login' ? 'Sign in' : 'Create account'}
            </CardTitle>
            <CardDescription>
              {mode === 'login'
                ? 'Enter your credentials or use OAuth to continue.'
                : 'Create your workspace and connect your tools.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Login / Sign up tabs */}
            <div className="flex rounded-lg border border-border bg-muted/30 p-1">
              <Button
                type="button"
                variant={mode === 'login' ? 'default' : 'ghost'}
                size="sm"
                className="flex-1 rounded-md transition-all duration-200"
                onClick={() => setMode('login')}
                aria-pressed={mode === 'login'}
                aria-label="Switch to sign in"
              >
                Sign in
              </Button>
              <Button
                type="button"
                variant={mode === 'signup' ? 'default' : 'ghost'}
                size="sm"
                className="flex-1 rounded-md transition-all duration-200"
                onClick={() => setMode('signup')}
                aria-pressed={mode === 'signup'}
                aria-label="Switch to sign up"
              >
                Sign up
              </Button>
            </div>

            <AuthForm
              mode={mode}
              onSubmitLogin={handleLogin}
              onSubmitSignup={handleSignup}
              isSubmitting={isSubmitting}
            />

            <OAuthButtons
              onGitHub={() => handleOAuth('github')}
              onGoogle={() => handleOAuth('google')}
              onSSO={() => handleOAuth('sso')}
              isLoading={isSubmitting}
            />

            <SSOMFACTA
              twoFactorEnabled={twoFactorEnabled}
              onTwoFactorChange={setTwoFactorEnabled}
              disabled
            />

            <p className="text-center text-sm text-muted-foreground">
              {mode === 'login' ? (
                <>
                  Don&apos;t have an account?{' '}
                  <button
                    type="button"
                    className={cn(
                      'font-medium text-primary transition-colors hover:underline',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded'
                    )}
                    onClick={() => setMode('signup')}
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    className={cn(
                      'font-medium text-primary transition-colors hover:underline',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded'
                    )}
                    onClick={() => setMode('login')}
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>
          </CardContent>
        </Card>

        <FooterLinks className="mt-8" />
      </div>
    </div>
  )
}
