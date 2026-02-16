import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Simple fuzzy match: query chars appear in order in text (case-insensitive) */
export function fuzzyMatch(query: string, text: string): boolean {
  if (!query.trim()) return true
  const q = query.trim().toLowerCase()
  const t = text.toLowerCase()
  let j = 0
  for (let i = 0; i < t.length && j < q.length; i++) {
    if (t[i] === q[j]) j++
  }
  return j === q.length
}
