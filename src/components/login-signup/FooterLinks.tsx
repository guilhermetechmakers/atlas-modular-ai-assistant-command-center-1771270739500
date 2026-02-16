import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

export interface FooterLinksProps {
  className?: string
}

/**
 * Footer links: Terms, Privacy, Help.
 */
export function FooterLinks({ className }: FooterLinksProps) {
  const links = [
    { to: '/terms', label: 'Terms' },
    { to: '/privacy', label: 'Privacy' },
    { to: '/help', label: 'Help' },
  ]

  return (
    <footer
      className={cn(
        'flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground',
        className
      )}
    >
      {links.map(({ to, label }) => (
        <Link
          key={to}
          to={to}
          className="hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded min-h-[44px] min-w-[44px] inline-flex items-center justify-center"
        >
          {label}
        </Link>
      ))}
    </footer>
  )
}
