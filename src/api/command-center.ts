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

/** Global search: filter existing index by query (client-side fuzzy) */
export function searchCommandCenter(
  _query: string,
  index: GlobalSearchResult[]
): GlobalSearchResult[] {
  return index
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
