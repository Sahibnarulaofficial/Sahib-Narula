/**
 * Central API configuration for the frontend.
 * Never put secret credentials here — this code runs in the browser.
 *
 * The backend URL is read from the VITE_API_BASE_URL environment variable.
 * Set it in frontend/.env (see .env.example).
 */

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000'

// ─── Contact ────────────────────────────────────────────────────────────────

export interface ContactPayload {
  name: string
  email: string
  message: string
}

export interface ContactResponse {
  success: boolean
  message: string
}

export async function sendContactMessage(
  payload: ContactPayload,
): Promise<ContactResponse> {
  const res = await fetch(`${API_BASE_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  // Try to parse JSON regardless of status code so we surface backend messages
  let data: ContactResponse
  try {
    data = await res.json()
  } catch {
    data = { success: false, message: 'An unexpected error occurred.' }
  }

  return data
}
