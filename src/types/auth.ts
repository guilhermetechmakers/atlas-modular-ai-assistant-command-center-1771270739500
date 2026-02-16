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
