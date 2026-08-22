import type { Request, Response, NextFunction } from 'express'

export interface AppError extends Error {
  status?: number
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorMiddleware(
  err: AppError,
  req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const status = err.status ?? 500

  // Log internally — never expose internals to client
  console.error(`[ERROR] ${req.method} ${req.path}:`, err.message)

  res.status(status).json({
    success: false,
    message:
      status === 500
        ? 'Something went wrong. Please try again.'
        : err.message,
  })
}