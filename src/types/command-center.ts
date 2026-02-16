/** Command center dashboard entity (maps to dashboard_/_command_center table) */
export interface DashboardCommandCenter {
  id: string
  user_id: string
  title: string
  description?: string
  status: string
  created_at: string
  updated_at: string
}

/** Global search result types for omnibox */
export type SearchResultType = 'repo' | 'issue' | 'note' | 'event' | 'transaction' | 'agent'

export interface GlobalSearchResult {
  id: string
  type: SearchResultType
  title: string
  subtitle?: string
  href: string
  meta?: string
}

/** Today panel event */
export interface TodayEvent {
  id: string
  title: string
  start: string
  end?: string
  isFocusBlock?: boolean
}

/** Quick task for Today panel */
export interface QuickTask {
  id: string
  label: string
  done: boolean
}

/** GitHub summary item */
export interface GitHubSummaryItem {
  id: string
  type: 'commit' | 'pr' | 'issue'
  title: string
  repo?: string
  created_at: string
  href?: string
}

/** Content pipeline item */
export interface ContentPipelineItem {
  id: string
  type: 'draft' | 'scheduled' | 'idea'
  title: string
  due?: string
  href?: string
}

/** Finance transaction */
export interface FinanceTransaction {
  id: string
  description: string
  amount: number
  date: string
  type: 'in' | 'out'
}

/** Agent activity item */
export interface AgentActivityItem {
  id: string
  title: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  href?: string
}

/** Aggregated payload for command center dashboard */
export interface CommandCenterData {
  events: TodayEvent[]
  quickTasks: QuickTask[]
  githubItems: GitHubSummaryItem[]
  contentItems: ContentPipelineItem[]
  transactions: FinanceTransaction[]
  runwayMonths: number | null
  agentActivities: AgentActivityItem[]
  searchIndex: GlobalSearchResult[]
}
