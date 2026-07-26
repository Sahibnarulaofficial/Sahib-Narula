import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { rateLimit } from 'express-rate-limit'
import { Resend } from 'resend'
import { z } from 'zod'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Rate Limiter: Max 5 access pass requests per 15 minutes per IP
const requestAccessLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Rate limit exceeded. Please wait 15 minutes before submitting another pass request.',
  },
})

// Request Access Zod Schema
const requestAccessSchema = z.object({
  driverName: z.string().min(2, 'Driver Name must be at least 2 characters.'),
  emailAddress: z.string().email('Please enter a valid email address.'),
  company: z.string().optional().default('N/A'),
  missionBrief: z.string().min(10, 'Mission Brief must be at least 10 characters.'),
  estimatedTimeline: z.string().min(1, 'Please select an estimated timeline.'),
  budget: z.string().optional().default('N/A'),
  passId: z.string().optional().default('PG-2026-001'),
})

// Healthcheck endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ONLINE', service: 'PROJECT GARAGE ACCESS API', timestamp: new Date().toISOString() })
})

// POST /api/request-access
app.post('/api/request-access', requestAccessLimiter, async (req, res) => {
  try {
    const parseResult = requestAccessSchema.safeParse(req.body)

    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: parseResult.error.flatten().fieldErrors,
      })
    }

    const { driverName, emailAddress, company, missionBrief, estimatedTimeline, budget, passId } =
      parseResult.data

    const resendApiKey = process.env.RESEND_API_KEY

    // If Resend API Key is not configured yet, simulate successful log & transmission
    if (!resendApiKey || resendApiKey.startsWith('re_123456789')) {
      console.log('----------------------------------------------------')
      console.log('⚡ [PROJECT GARAGE] DEMO TRANSMISSION DELIVERED ⚡')
      console.log(`Pass ID: ${passId}`)
      console.log(`Driver: ${driverName} <${emailAddress}>`)
      console.log(`Company: ${company}`)
      console.log(`Timeline: ${estimatedTimeline} | Budget: ${budget}`)
      console.log(`Mission: ${missionBrief}`)
      console.log('----------------------------------------------------')

      return res.status(200).json({
        success: true,
        message: 'Garage Access Request Received. Transmission Delivered.',
        passId,
        demoMode: true,
      })
    }

    // Production Resend Dispatch
    const resend = new Resend(resendApiKey)
    const toEmail = process.env.RESEND_TO_EMAIL || 'hello@sahibnarula.com'
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Project Garage <onboarding@resend.dev>'

    const emailResponse = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `[PROJECT GARAGE PASS] Request from ${driverName} (${passId})`,
      html: `
        <div style="background-color: #050505; color: #f5f5f5; font-family: monospace; padding: 32px; border: 1px solid #27272a; border-radius: 8px;">
          <h2 style="color: #ffffff; letter-spacing: 2px; margin-bottom: 4px;">PROJECT GARAGE // ACCESS PASS TRANSMISSION</h2>
          <p style="color: #a1a1aa; font-size: 12px; margin-top: 0;">PASS ID: <strong style="color: #00FFC6;">${passId}</strong></p>
          <hr style="border: 0; border-top: 1px solid #27272a; margin: 24px 0;" />
          <table style="width: 100%; color: #f5f5f5; font-size: 14px; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #a1a1aa;">DRIVER NAME:</td><td style="font-weight: bold;">${driverName}</td></tr>
            <tr><td style="padding: 8px 0; color: #a1a1aa;">EMAIL ADDRESS:</td><td>${emailAddress}</td></tr>
            <tr><td style="padding: 8px 0; color: #a1a1aa;">COMPANY:</td><td>${company}</td></tr>
            <tr><td style="padding: 8px 0; color: #a1a1aa;">TIMELINE:</td><td>${estimatedTimeline}</td></tr>
            <tr><td style="padding: 8px 0; color: #a1a1aa;">BUDGET:</td><td>${budget}</td></tr>
          </table>
          <hr style="border: 0; border-top: 1px solid #27272a; margin: 24px 0;" />
          <p style="color: #a1a1aa; font-size: 12px; margin-bottom: 8px;">MISSION BRIEF:</p>
          <div style="background-color: #101010; padding: 16px; border-radius: 4px; border: 1px solid #27272a; line-height: 1.6;">
            ${missionBrief.replace(/\n/g, '<br />')}
          </div>
        </div>
      `,
    })

    if (emailResponse.error) {
      console.error('Resend Dispatch Error:', emailResponse.error)
      return res.status(500).json({
        success: false,
        error: 'Failed to send email transmission via Resend.',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Garage Access Request Received. Transmission Delivered.',
      passId,
    })
  } catch (error) {
    console.error('API Endpoint Error:', error)
    return res.status(500).json({
      success: false,
      error: 'Internal server error while processing access pass.',
    })
  }
})

app.listen(PORT, () => {
  console.log(`⚡ Project Garage Access API running on http://localhost:${PORT}`)
})
