import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Mail, CheckCircle2, Loader2, Send, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/contexts/auth-context'
import { resendVerificationEmail } from '@/api/auth'
import { cn } from '@/lib/utils'

const RESEND_COOLDOWN_MS = 60_000

export function VerifyEmailPage() {
  const { user, emailVerified, setEmailVerified } = useAuth()
  const navigate = useNavigate()
  const [isResending, setIsResending] = useState(false)
  const [resendError, setResendError] = useState<string | null>(null)
  const [cooldownRemaining, setCooldownRemaining] = useState(0)

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true })
      return
    }
  }, [user, navigate])

  useEffect(() => {
    if (cooldownRemaining <= 0) return
    const t = setInterval(() => {
      setCooldownRemaining((s) => {
        const next = Math.max(0, s - 1)
        return next
      })
    }, 1000)
    return () => clearInterval(t)
  }, [cooldownRemaining])

  const handleResend = async () => {
    if (!user || isResending || cooldownRemaining > 0) return
    setResendError(null)
    setIsResending(true)
    try {
      await resendVerificationEmail()
      toast.success('Verification email sent. Check your inbox.')
      setCooldownRemaining(Math.floor(RESEND_COOLDOWN_MS / 1000))
    } catch (err) {
      const message =
        err && typeof err === 'object' && 'message' in err
          ? String((err as { message: string }).message)
          : 'Failed to send. Please try again.'
      setResendError(message)
      toast.error(message)
    } finally {
      setIsResending(false)
    }
  }

  const handleMarkVerified = () => {
    setEmailVerified(true)
    toast.success('Email verified.')
    navigate('/dashboard', { replace: true })
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="h-8 w-8 animate-pulse rounded-full bg-muted" aria-hidden />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card
        className={cn(
          'w-full max-w-md animate-scale-in',
          resendError && 'animate-shake'
        )}
      >
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Mail className="h-6 w-6" aria-hidden />
          </div>
          <CardTitle className="text-2xl">Verify your email</CardTitle>
          <CardDescription>
            {emailVerified
              ? 'Your email is verified. You can access your dashboard.'
              : 'We sent a verification link to your email. Click it to verify.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg border border-border bg-secondary/50 p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Email address
            </p>
            <p className="mt-1 font-medium text-foreground" aria-label="Your email">
              {user.email}
            </p>
            <div className="mt-3 flex items-center gap-2">
              {emailVerified ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-green-500" aria-hidden />
                  <span className="text-sm text-muted-foreground">Verified</span>
                </>
              ) : (
                <>
                  <span className="inline-flex h-2 w-2 rounded-full bg-amber-500" aria-hidden />
                  <span className="text-sm text-muted-foreground">Pending verification</span>
                </>
              )}
            </div>
          </div>

          {resendError && (
            <div
              className="flex items-start gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive"
              role="alert"
            >
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" aria-hidden />
              <span>{resendError}</span>
            </div>
          )}

          {emailVerified ? (
            <div className="space-y-3">
              <Button
                className="w-full"
                onClick={() => navigate('/dashboard')}
              >
                Go to dashboard
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                <Link to="/login" className="text-primary hover:underline">
                  Sign in with a different account
                </Link>
              </p>
            </div>
          ) : (
            <>
              <Button
                type="button"
                className="w-full"
                variant="secondary"
                onClick={handleResend}
                disabled={isResending || cooldownRemaining > 0}
              >
                {isResending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                    Sending…
                  </>
                ) : cooldownRemaining > 0 ? (
                  `Resend in ${cooldownRemaining}s`
                ) : (
                  <>
                    <Send className="h-4 w-4" aria-hidden />
                    Resend verification email
                  </>
                )}
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                Didn’t receive the email? Check spam or resend above.
              </p>
              <p className="text-center text-sm text-muted-foreground">
                <Link to="/login" className="text-primary hover:underline">
                  Back to sign in
                </Link>
              </p>
              {/* For demo without backend: allow marking as verified */}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="w-full text-muted-foreground"
                onClick={handleMarkVerified}
              >
                I already verified my email
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
