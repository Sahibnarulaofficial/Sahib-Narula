# Sahib Narula Portfolio — Backend

Express + TypeScript backend for the portfolio contact form. Uses Resend for transactional email.

## Stack

- Node.js + TypeScript
- Express 4
- Resend (email)
- express-validator (input validation)
- express-rate-limit (basic rate limiting)

## Setup

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `backend/.env`:

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | Your Resend API key from resend.com/dashboard |
| `CONTACT_TO_EMAIL` | Email address that receives contact form submissions |
| `CONTACT_FROM_EMAIL` | Verified sender email (must be added in Resend) |
| `PORT` | Port to run the backend on (default: 5000) |
| `FRONTEND_URL` | Frontend origin for CORS (default: http://localhost:5173) |

### 3. Start development server

```bash
npm run dev
```

### 4. Test the health endpoint

```bash
curl http://localhost:5000/api/health
# { "status": "ok" }
```

### 5. Test the contact endpoint

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello from the test suite!"}'
```

## Resend Configuration

1. Create an account at [resend.com](https://resend.com)
2. Add and verify your sending domain
3. Generate an API key
4. Set `RESEND_API_KEY` in `backend/.env`
5. Set `CONTACT_FROM_EMAIL` to a verified sender address

## Production

```bash
npm run build
npm start
```

Make sure to set all environment variables in your production environment. Never commit `.env` to version control.