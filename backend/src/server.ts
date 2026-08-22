import app from './app'
import { env } from './config/env'

app.listen(env.PORT, () => {
  console.log(`
  ╔══════════════════════════════════════╗
  ║  Sahib Narula — Portfolio Backend    ║
  ║  Server running on port ${env.PORT}        ║
  ║  Health: http://localhost:${env.PORT}/api/health ║
  ╚══════════════════════════════════════╝
  `)
})