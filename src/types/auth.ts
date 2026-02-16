export interface AuthUser {
  email: string
  emailVerified: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupData {
  email: string
  password: string
  workspaceName: string
}

export interface AuthSession {
  user: AuthUser
}

/** DB/API type for login/signup scope (table: login_/_signup). */
export interface LoginSignup {
  id: string
  user_id: string
  title: string
  description?: string
  status: string
  created_at: string
  updated_at: string
}
