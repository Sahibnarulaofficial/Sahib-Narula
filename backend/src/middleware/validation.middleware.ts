import { body, validationResult } from 'express-validator'
import type { Request, Response, NextFunction } from 'express'

export const contactValidators = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required.')
    .isLength({ max: 100 }).withMessage('Name must be 100 characters or fewer.'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('A valid email address is required.')
    .normalizeEmail()
    .isLength({ max: 254 }).withMessage('Email must be 254 characters or fewer.'),

  body('message')
    .trim()
    .notEmpty().withMessage('Message is required.')
    .isLength({ min: 10 }).withMessage('Message must be at least 10 characters.')
    .isLength({ max: 4000 }).withMessage('Message must be 4000 characters or fewer.'),
]

export function handleValidationErrors(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      message: 'Please check the submitted information.',
      errors: errors.array().map((e) => ({
        field: 'path' in e ? e.path : 'unknown',
        message: e.msg,
      })),
    })
    return
  }
  next()
}