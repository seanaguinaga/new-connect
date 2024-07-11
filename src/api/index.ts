import { getAccessToken } from './auth/client'
import { BASE_URL } from './config'

export async function fetcher<T>(endpoint: string, init?: RequestInit, apiUrl: string = BASE_URL): Promise<T> {
  const res = await fetch(`${apiUrl}${endpoint}`, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `JWT ${getAccessToken()}`,
    },
  })

  // TODO: validate responses
  const json = await res.json() as T & { error?: string; description?: string }
  if (json.error) {
    throw new Error(json.description)
  }
  return json
}
