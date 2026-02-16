import * as React from 'react'
import type { AuthUser } from '@/types/auth'

const STORAGE_KEY = 'atlas_auth'

function loadStored(): AuthUser | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw) as AuthUser
    return data?.email ? data : null
  } catch {
    return null
  }
}

function saveStored(user: AuthUser | null) {
  try {
    if (user) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    else sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}

interface AuthContextValue {
  user: AuthUser | null
  isAuthenticated: boolean
  emailVerified: boolean
  setUser: (user: AuthUser | null) => void
  setEmailVerified: (verified: boolean) => void
  logout: () => void
}

const AuthContext = React.createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = React.useState<AuthUser | null>(loadStored)

  const setUser = React.useCallback((next: AuthUser | null) => {
    setUserState(next)
    saveStored(next)
  }, [])

  const setEmailVerified = React.useCallback((verified: boolean) => {
    setUserState((prev) => {
      if (!prev) return prev
      const next = { ...prev, emailVerified: verified }
      saveStored(next)
      return next
    })
  }, [])

  const logout = React.useCallback(() => {
    setUserState(null)
    saveStored(null)
  }, [])

  const value: AuthContextValue = React.useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      emailVerified: user?.emailVerified ?? false,
      setUser,
      setEmailVerified,
      logout,
    }),
    [user, setUser, setEmailVerified, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = React.useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
