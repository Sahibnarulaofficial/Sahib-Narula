import dotenv from 'dotenv'
import path from 'path'

// Load .env from backend root
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

function optional(name: string, fallback: string): string {
  return process.env[name] ?? fallback
}

export const env = {
  PORT: parseInt(optional('PORT', '5000'), 10),
  RESEND_API_KEY: optional('RESEND_API_KEY', ''),
  CONTACT_TO_EMAIL: optional('CONTACT_TO_EMAIL', 'hello@sahibnarula.com'),
  CONTACT_FROM_EMAIL: optional('CONTACT_FROM_EMAIL', 'noreply@sahibnarula.com'),
  FRONTEND_URL: optional('FRONTEND_URL', 'http://localhost:5173'),
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
}