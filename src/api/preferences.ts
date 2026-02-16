import { api } from '@/lib/api'
import type { SettingsPreferences } from '@/types/preferences'

const PREFERENCES_PATH = '/preferences'

export async function getPreferences(): Promise<SettingsPreferences[]> {
  return api.get<SettingsPreferences[]>(PREFERENCES_PATH)
}

export async function getPreferenceById(id: string): Promise<SettingsPreferences | null> {
  try {
    return await api.get<SettingsPreferences>(`${PREFERENCES_PATH}/${id}`)
  } catch {
    return null
  }
}

export async function createPreference(data: Omit<SettingsPreferences, 'id' | 'created_at' | 'updated_at'>): Promise<SettingsPreferences> {
  return api.post<SettingsPreferences>(PREFERENCES_PATH, data)
}

export async function updatePreference(
  id: string,
  data: Partial<Pick<SettingsPreferences, 'title' | 'description' | 'status'>>
): Promise<SettingsPreferences> {
  return api.patch<SettingsPreferences>(`${PREFERENCES_PATH}/${id}`, data)
}

export async function deletePreference(id: string): Promise<void> {
  await api.delete(`${PREFERENCES_PATH}/${id}`)
}
