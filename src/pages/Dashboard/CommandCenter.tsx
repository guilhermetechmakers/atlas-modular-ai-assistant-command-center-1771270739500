import { useEffect, useState, useCallback } from 'react'
import {
  GlobalSearchBar,
  TodayPanel,
  GitHubSummaryCard,
  ContentPipelineCard,
  FinanceSnapshotCard,
  AgentActivityFeed,
  QuickActionsToolbar,
  NotificationsAuditLogQuickLink,
} from '@/components/dashboard-command-center'
import { getCommandCenterData, type CommandCenterData } from '@/api/command-center'
import type {
  GlobalSearchResult,
  GitHubSummaryItem,
  ContentPipelineItem,
  TodayEvent,
  FinanceTransaction,
  AgentActivityItem,
} from '@/types/command-center'

function buildSearchIndex(data: CommandCenterData): GlobalSearchResult[] {
  const index: GlobalSearchResult[] = []
  data.githubItems.forEach((i: GitHubSummaryItem) => {
    index.push({
      id: i.id,
      type: i.type === 'commit' ? 'repo' : 'issue',
      title: i.title,
      subtitle: i.repo,
      href: i.href ?? '/dashboard/projects',
      meta: i.created_at,
    })
  })
  data.contentItems.forEach((i: ContentPipelineItem) => {
    index.push({
      id: i.id,
      type: 'note',
      title: i.title,
      href: i.href ?? '/dashboard/content',
      meta: i.due,
    })
  })
  data.events.forEach((e: TodayEvent) => {
    index.push({
      id: e.id,
      type: 'event',
      title: e.title,
      subtitle: e.start,
      href: '/dashboard/calendar',
    })
  })
  data.transactions.forEach((t: FinanceTransaction) => {
    index.push({
      id: t.id,
      type: 'transaction',
      title: t.description,
      meta: t.date,
      href: '/dashboard/finance',
    })
  })
  data.agentActivities.forEach((a: AgentActivityItem) => {
    index.push({
      id: a.id,
      type: 'agent',
      title: a.title,
      meta: a.created_at,
      href: a.href ?? '/dashboard/agents',
    })
  })
  return index
}

export default function CommandCenterPage() {
  const [data, setData] = useState<CommandCenterData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    getCommandCenterData()
      .then((d) => {
        if (!cancelled) setData(d)
      })
      .catch(() => {
        if (!cancelled) {
          setError('Failed to load dashboard.')
          setData({
            events: [],
            quickTasks: [],
            githubItems: [],
            contentItems: [],
            transactions: [],
            runwayMonths: null,
            agentActivities: [],
            searchIndex: [],
          })
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const searchIndex = data ? buildSearchIndex(data) : []
  const repos = Array.from(
    new Set((data?.githubItems ?? []).map((i: GitHubSummaryItem) => i.repo).filter(Boolean) as string[])
  )

  const handleTaskToggle = useCallback((_taskId: string, _done: boolean) => {
    // Optional: persist task state via API
  }, [])

  if (error && !data) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="text-center">
          <p className="text-destructive">{error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-2 text-sm text-primary hover:underline"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  const pageTitle = 'Command Center | Atlas'
  useEffect(() => {
    document.title = pageTitle
    return () => {
      document.title = 'Atlas'
    }
  }, [])

  return (
    <>
      <div className="space-y-6 animate-fade-in">
        {/* Header + Global search + Notifications */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white md:text-3xl">Command Center</h1>
            <p className="mt-1 text-muted-foreground">
              Your daily summary: GitHub activity, calendar, content tasks, finance alerts, and agent suggestions.
            </p>
          </div>
          <NotificationsAuditLogQuickLink />
        </div>

        {/* Global Search Bar - omnibox */}
        <GlobalSearchBar searchIndex={searchIndex} className="w-full max-w-2xl" />

        {/* Quick Actions Toolbar */}
        <QuickActionsToolbar />

        {/* Today + GitHub + Content + Finance - bento grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <TodayPanel
              events={data?.events ?? []}
              quickTasks={data?.quickTasks ?? []}
              isLoading={loading}
              onTaskToggle={handleTaskToggle}
            />
          </div>
          <div className="space-y-6">
            <GitHubSummaryCard
              items={data?.githubItems ?? []}
              repos={repos}
              isLoading={loading}
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <ContentPipelineCard
            items={data?.contentItems ?? []}
            isLoading={loading}
          />
          <FinanceSnapshotCard
            transactions={data?.transactions ?? []}
            runwayMonths={data?.runwayMonths ?? null}
            isLoading={loading}
          />
        </div>

        {/* Agent Activity Feed */}
        <AgentActivityFeed
          items={data?.agentActivities ?? []}
          isLoading={loading}
        />
      </div>
    </>
  )
}
