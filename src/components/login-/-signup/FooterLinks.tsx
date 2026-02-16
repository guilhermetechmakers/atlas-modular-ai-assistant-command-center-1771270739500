import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

export interface FooterLinksProps {
  className?: string
}

const links = [
  { to: '/terms', label: 'Terms' },
  { to: '/privacy', label: 'Privacy' },
  { to: '/help', label: 'Help' },
] as const

export function FooterLinks({ className }: FooterLinksProps) {
  return (
    <footer
      className={cn('flex flex-wrap items-center justify-center gap-x-4 gap-y-2', className)}
      role="contentinfo"
    >
      {links.map(({ to, label }) => (
        <Link
          key={to}
          to={to}
          className="text-sm text-muted-foreground transition-colors hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
        >
          {label}
        </Link>
      ))}
    </footer>
  )
}
