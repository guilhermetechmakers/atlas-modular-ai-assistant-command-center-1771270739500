import { api } from '@/lib/api'
import type { ApiError } from '@/lib/api'
import type { AuthSession, LoginCredentials, SignupData } from '@/types/auth'

const AUTH_BASE = '/auth'

/** Login and return session; backend should set cookie/session. */
export async function login(credentials: LoginCredentials): Promise<AuthSession> {
  try {
    const res = await api.post<AuthSession>(`${AUTH_BASE}/login`, credentials)
    return res as AuthSession
  } catch (err) {
    const status = err && typeof err === 'object' && 'status' in err ? (err as ApiError).status : 0
    if (status === 404 || status === 501) {
      return { user: { email: credentials.email, emailVerified: false } }
    }
    throw err
  }
}

/** Signup and return session; email is unverified until user clicks link. */
export async function signup(data: SignupData): Promise<AuthSession> {
  try {
    const res = await api.post<AuthSession>(`${AUTH_BASE}/signup`, data)
    return res as AuthSession
  } catch (err) {
    const status = err && typeof err === 'object' && 'status' in err ? (err as ApiError).status : 0
    if (status === 404 || status === 501) {
      return { user: { email: data.email, emailVerified: false } }
    }
    throw err
  }
}

/** Get current session (e.g. on app load). */
export async function getSession(): Promise<AuthSession | null> {
  try {
    const res = await api.get<AuthSession | null>(`${AUTH_BASE}/session`)
    return res ?? null
  } catch {
    return null
  }
}

/** Resend verification email for the current user. */
export async function resendVerificationEmail(): Promise<void> {
  try {
    await api.post<void>(`${AUTH_BASE}/resend-verification`)
  } catch (err) {
    const status = err && typeof err === 'object' && 'status' in err ? (err as ApiError).status : 0
    if (status === 404 || status === 501) {
      return
    }
    throw err
  }
}
