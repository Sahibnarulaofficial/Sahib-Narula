import type { Request, Response, NextFunction } from 'express'
import { sendContactEmail } from '../services/email.service'

export async function contactHandler(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { name, email, message } = req.body as {
      name: string
      email: string
      message: string
    }

    await sendContactEmail({ name, email, message })

    res.status(200).json({
      success: true,
      message: 'Message sent successfully.',
    })
  } catch (err) {
    next(err)
  }
}