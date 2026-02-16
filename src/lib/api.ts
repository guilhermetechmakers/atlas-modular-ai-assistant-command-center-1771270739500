const env = (import.meta as unknown as { env?: { VITE_API_URL?: string } }).env
const API_BASE = env?.VITE_API_URL ?? '/api'

export type ApiError = {
  message: string
  code?: string
  status?: number
}

async function handleResponse<T>(res: Response): Promise<T> {
  const contentType = res.headers.get('content-type')
  const isJson = contentType?.includes('application/json')

  if (!res.ok) {
    const error: ApiError = {
      message: 'An error occurred',
      status: res.status,
    }
    if (isJson) {
      try {
        const data = (await res.json()) as { message?: string; error?: string }
        error.message = data.message ?? data.error ?? error.message
      } catch {
        // use default
      }
    }
    throw error
  }

  if (res.status === 204 || !isJson) return undefined as T
  return res.json() as Promise<T>
}

export async function apiFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const url = path.startsWith('http') ? path : `${API_BASE}${path}`
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    credentials: 'include',
  })
  return handleResponse<T>(res)
}

export const api = {
  get: <T>(path: string) => apiFetch<T>(path, { method: 'GET' }),
  post: <T>(path: string, body?: unknown) =>
    apiFetch<T>(path, { method: 'POST', body: body ? JSON.stringify(body) : undefined }),
  put: <T>(path: string, body?: unknown) =>
    apiFetch<T>(path, { method: 'PUT', body: body ? JSON.stringify(body) : undefined }),
  patch: <T>(path: string, body?: unknown) =>
    apiFetch<T>(path, { method: 'PATCH', body: body ? JSON.stringify(body) : undefined }),
  delete: <T>(path: string) => apiFetch<T>(path, { method: 'DELETE' }),
}
