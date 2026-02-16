/** User preferences / settings (maps to settings_preferences table) */
export interface SettingsPreferences {
  id: string
  user_id: string
  title: string
  description?: string
  status: string
  created_at: string
  updated_at: string
}

export interface ProfileFormData {
  name: string
  email: string
  avatar_url?: string
}

export interface IntegrationItem {
  id: string
  provider: 'github' | 'google_calendar'
  connected: boolean
  display_name: string
}

export interface ApiKeyItem {
  id: string
  name: string
  last_four?: string
  created_at: string
}

export interface SessionItem {
  id: string
  device?: string
  last_active: string
  current: boolean
}
