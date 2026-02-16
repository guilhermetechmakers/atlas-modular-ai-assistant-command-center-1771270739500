import { Link } from 'react-router-dom'
import { ArrowRight, Github, Calendar, FileText, Wallet, Bot, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 md:py-32">
          <div className="animate-fade-in-up mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              Your unified{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                command center
              </span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl">
              Projects, content, research, calendar, and finance in one searchable workspace—powered by modular AI agents you control.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg" className="min-w-[160px]">
                <Link to="/signup">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="min-w-[160px]">
                <Link to="/help">Self-host Guide</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature grid - bento style */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <h2 className="text-center text-2xl font-bold text-white md:text-3xl">
          One workspace. Every domain.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          Connect GitHub, Google Calendar, and your tools. Let domain agents assist with PM, content, research, and finance—with human approval and audit logs.
        </p>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Github, title: 'GitHub-first PM', desc: 'Repos, issues, roadmaps, and AI PM actions in one place.' },
            { icon: FileText, title: 'Content Pipeline', desc: 'Ideas → drafts → schedule → publish with repurpose tools.' },
            { icon: Calendar, title: 'Calendar & Travel', desc: 'Events, tasks, trip planning, and focus blocks.' },
            { icon: Wallet, title: 'Finance Cockpit', desc: 'Ledger, budgets, runway, and AI summaries.' },
            { icon: Bot, title: 'Agent Builder', desc: 'Custom agents and skill registry with approval policies.' },
            { icon: Shield, title: 'Self-host & audit', desc: 'Encrypted tokens, RBAC, append-only audit logs.' },
          ].map((item, i) => (
            <div
              key={item.title}
              className={cn(
                'rounded-xl border border-border bg-card p-6 shadow-card transition-all duration-200 hover:scale-[1.02] hover:shadow-card-hover',
                'animate-fade-in'
              )}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <item.icon className="h-10 w-10 text-primary" />
              <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-24">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold text-white md:text-3xl">
            Ready to replace the chaos?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Sign up and connect GitHub and Google Calendar to get started.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/signup">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link to="/login">I have an account</Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 text-sm text-muted-foreground">
          <span>© Atlas. Self-hostable command center.</span>
          <div className="flex gap-6">
            <Link to="/login-/-signup" className="hover:text-foreground">Login / Sign up</Link>
            <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link to="/terms" className="hover:text-foreground">Terms</Link>
            <Link to="/help" className="hover:text-foreground">Help</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
