import { api } from '@/lib/api'
import type {
  DashboardCommandCenter,
  CommandCenterData,
  GlobalSearchResult,
} from '@/types/command-center'

const BASE = '/command-center'

export type { CommandCenterData }

const emptyData: CommandCenterData = {
  events: [],
  quickTasks: [],
  githubItems: [],
  contentItems: [],
  transactions: [],
  runwayMonths: null,
  agentActivities: [],
  searchIndex: [],
}

/** Fetch all command center dashboard data */
export async function getCommandCenterData(): Promise<CommandCenterData> {
  try {
    const data = await api.get<CommandCenterData>(`${BASE}/data`)
    return data ?? emptyData
  } catch {
    return emptyData
  }
}

/** Simple fuzzy match: query chars appear in order in text (case-insensitive) */
function fuzzyMatch(query: string, text: string): boolean {
  if (!query.trim()) return true
  const q = query.trim().toLowerCase()
  const t = text.toLowerCase()
  let j = 0
  for (let i = 0; i < t.length && j < q.length; i++) {
    if (t[i] === q[j]) j++
  }
  return j === q.length
}

/** Global search: filter existing index by query (client-side fuzzy) */
export function searchCommandCenter(
  query: string,
  index: GlobalSearchResult[]
): GlobalSearchResult[] {
  if (!query.trim()) return index.slice(0, 20)
  return index.filter(
    (r) =>
      fuzzyMatch(query, r.title) ||
      (r.subtitle != null && fuzzyMatch(query, r.subtitle)) ||
      (r.meta != null && fuzzyMatch(query, r.meta))
  )
}

/** CRUD for dashboard command center entities */
export async function getCommandCenterList(): Promise<DashboardCommandCenter[]> {
  try {
    return await api.get<DashboardCommandCenter[]>(BASE)
  } catch {
    return []
  }
}

export async function createCommandCenter(
  data: Omit<DashboardCommandCenter, 'id' | 'created_at' | 'updated_at'>
): Promise<DashboardCommandCenter> {
  return api.post<DashboardCommandCenter>(BASE, data)
}

export async function updateCommandCenter(
  id: string,
  data: Partial<Pick<DashboardCommandCenter, 'title' | 'description' | 'status'>>
): Promise<DashboardCommandCenter> {
  return api.patch<DashboardCommandCenter>(`${BASE}/${id}`, data)
}

export async function deleteCommandCenter(id: string): Promise<void> {
  await api.delete(`${BASE}/${id}`)
}
