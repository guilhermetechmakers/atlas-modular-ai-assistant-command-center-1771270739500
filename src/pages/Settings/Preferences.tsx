import { useState, useEffect } from 'react'
import { User, Link2, Shield, CreditCard, Download, Server } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProfileSettings } from '@/components/settings-preferences/ProfileSettings'
import { Integrations } from '@/components/settings-preferences/Integrations'
import { Security } from '@/components/settings-preferences/Security'
import { BillingPlan } from '@/components/settings-preferences/BillingPlan'
import { ExportBackup } from '@/components/settings-preferences/ExportBackup'
import { SelfHosting } from '@/components/settings-preferences/SelfHosting'
import type { ProfileFormData } from '@/types/preferences'

const PREFERENCES_TITLE = 'Settings & Preferences | Atlas'

/** Fetch user profile for preferences (mock for now; replace with api.get when backend exists) */
async function fetchProfile(): Promise<ProfileFormData | null> {
  try {
    const res = await fetch('/api/me', { credentials: 'include' })
    if (!res.ok) return null
    const data = (await res.json()) as { name?: string; email?: string; avatar_url?: string }
    return {
      name: data.name ?? 'User',
      email: data.email ?? '',
      avatar_url: data.avatar_url,
    }
  } catch {
    return null
  }
}

export default function PreferencesPage() {
  const [profile, setProfile] = useState<ProfileFormData | null>(null)
  const [profileLoading, setProfileLoading] = useState(true)

  useEffect(() => {
    document.title = PREFERENCES_TITLE
    return () => {
      document.title = 'Atlas'
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    fetchProfile().then((data) => {
      if (!cancelled) {
        setProfile(data)
        setProfileLoading(false)
      }
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="space-y-6 animate-fade-in">
        <header>
          <h1 className="text-2xl font-bold text-white md:text-3xl">Settings & Preferences</h1>
          <p className="mt-1 text-muted-foreground">
            Profile, integrations, security, billing, export & backup, and self-host configuration.
          </p>
        </header>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="flex h-auto w-full flex-wrap gap-1 rounded-xl bg-muted p-1.5 sm:flex-nowrap">
            <TabsTrigger value="profile" className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="integrations" className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Link2 className="h-4 w-4" />
              Integrations
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="billing" className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <CreditCard className="h-4 w-4" />
              Billing & Plan
            </TabsTrigger>
            <TabsTrigger value="data" className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Download className="h-4 w-4" />
              Export & Backup
            </TabsTrigger>
            <TabsTrigger value="selfhost" className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Server className="h-4 w-4" />
              Self-hosting
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-4">
            <ProfileSettings initialData={profile} isLoading={profileLoading} />
          </TabsContent>
          <TabsContent value="integrations" className="mt-4">
            <Integrations isLoading={false} />
          </TabsContent>
          <TabsContent value="security" className="mt-4">
            <Security isLoading={false} />
          </TabsContent>
          <TabsContent value="billing" className="mt-4">
            <BillingPlan isLoading={false} />
          </TabsContent>
          <TabsContent value="data" className="mt-4 space-y-6">
            <ExportBackup isLoading={false} />
            <SelfHosting isLoading={false} />
          </TabsContent>
          <TabsContent value="selfhost" className="mt-4">
            <SelfHosting isLoading={false} />
          </TabsContent>
        </Tabs>
      </div>
  )
}
