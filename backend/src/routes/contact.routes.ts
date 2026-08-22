import { Router } from 'express'
import { contactValidators, handleValidationErrors } from '../middleware/validation.middleware'
import { contactHandler } from '../controllers/contact.controller'

const router = Router()

router.post(
  '/contact',
  contactValidators,
  handleValidationErrors,
  contactHandler,
)

export default router