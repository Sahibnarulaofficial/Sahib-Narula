import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import { env } from './config/env'
import contactRoutes from './routes/contact.routes'
import { errorMiddleware } from './middleware/error.middleware'

const app = express()

// ── Security & Parsing ──────────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: false }))

// ── CORS ────────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: env.FRONTEND_URL,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: false,
  }),
)

// ── Rate Limiting ───────────────────────────────────────────────────────────
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,                   // max 10 requests per window per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests. Please wait before trying again.',
  },
})

// ── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' })
})

// ── Routes ───────────────────────────────────────────────────────────────────
app.use('/api', contactLimiter, contactRoutes)

// ── 404 ──────────────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Not found.' })
})

// ── Error Handler ─────────────────────────────────────────────────────────────
app.use(errorMiddleware)

export default app