import { useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, FolderGit2, FileText, Calendar, Wallet, Bot, AlertCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { fuzzyMatch } from '@/lib/utils'
import type { GlobalSearchResult, SearchResultType } from '@/types/command-center'

const typeIcons: Record<SearchResultType, React.ComponentType<{ className?: string }>> = {
  repo: FolderGit2,
  issue: AlertCircle,
  note: FileText,
  event: Calendar,
  transaction: Wallet,
  agent: Bot,
}

export interface GlobalSearchBarProps {
  searchIndex: GlobalSearchResult[]
  className?: string
  placeholder?: string
}

export function GlobalSearchBar({
  searchIndex,
  className,
  placeholder = 'Search repos, notes, events, transactions, agents…',
}: GlobalSearchBarProps) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const navigate = useNavigate()

  const results = useMemo(() => {
    if (!query.trim()) return searchIndex.slice(0, 8)
    return searchIndex.filter(
      (r) =>
        fuzzyMatch(query, r.title) ||
        (r.subtitle && fuzzyMatch(query, r.subtitle)) ||
        (r.meta && fuzzyMatch(query, r.meta))
    )
  }, [query, searchIndex])

  const selectResult = useCallback(
    (result: GlobalSearchResult) => {
      setIsOpen(false)
      setQuery('')
      setSelectedIndex(0)
      if (result.href.startsWith('/')) navigate(result.href)
      else window.location.href = result.href
    },
    [navigate]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((i) => (i + 1) % Math.max(1, results.length))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((i) => (i - 1 + results.length) % Math.max(1, results.length))
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault()
        selectResult(results[selectedIndex])
      } else if (e.key === 'Escape') {
        setIsOpen(false)
      }
    },
    [isOpen, results, selectedIndex, selectResult]
  )

  return (
    <div className={cn('relative w-full max-w-xl', className)}>
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <Input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
            setSelectedIndex(0)
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 150)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="h-11 w-full pl-10 pr-4 rounded-xl border-border bg-secondary/50 focus-visible:ring-2 focus-visible:ring-primary/50 transition-all duration-200"
          aria-label="Global search"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-controls="global-search-results"
          aria-activedescendant={
            results[selectedIndex] ? `search-result-${results[selectedIndex].id}` : undefined
          }
        />
      </div>
      {isOpen && (
        <div
          id="global-search-results"
          role="listbox"
          className="absolute top-full left-0 right-0 z-50 mt-2 rounded-xl border border-border bg-popover shadow-card overflow-hidden animate-fade-in"
        >
          {results.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-muted-foreground">
              No results. Try repos, notes, events, or transactions.
            </div>
          ) : (
            <ul className="max-h-[min(60vh,320px)] overflow-auto py-2">
              {results.map((r, i) => {
                const Icon = typeIcons[r.type]
                return (
                  <li
                    key={r.id}
                    id={`search-result-${r.id}`}
                    role="option"
                    aria-selected={i === selectedIndex}
                    className={cn(
                      'flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors',
                      i === selectedIndex ? 'bg-primary/15 text-foreground' : 'hover:bg-secondary/80'
                    )}
                    onMouseEnter={() => setSelectedIndex(i)}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      selectResult(r)
                    }}
                  >
                    {Icon && <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{r.title}</p>
                      {(r.subtitle || r.meta) && (
                        <p className="truncate text-xs text-muted-foreground">
                          {r.subtitle ?? r.meta}
                        </p>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground capitalize">{r.type}</span>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
