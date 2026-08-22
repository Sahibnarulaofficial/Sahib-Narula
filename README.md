# Sahib Narula — Portfolio

A premium personal portfolio built with React + TypeScript + GSAP (frontend) and Express + TypeScript + Resend (backend).

---

## Project Structure

```
Sahib-Narula/
├── frontend/          ← React + Vite + TypeScript + Tailwind + GSAP
│   ├── src/
│   ├── public/
│   ├── .env           ← local config (not committed)
│   ├── .env.example   ← copy this to .env
│   └── package.json
│
├── backend/           ← Express + TypeScript + Resend
│   ├── src/
│   ├── .env           ← local secrets (not committed)
│   ├── .env.example   ← copy this to .env
│   └── package.json
│
└── package.json       ← root scripts (run both with one command)
```

---

## Quick Start

### 1. Install all dependencies

```bash
npm run install:all
```

Or individually:

```bash
cd frontend && npm install
cd backend  && npm install
```

### 2. Configure the backend

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | API key from [resend.com/dashboard](https://resend.com/dashboard) |
| `CONTACT_TO_EMAIL` | Email that receives contact submissions |
| `CONTACT_FROM_EMAIL` | Verified sender address in Resend |
| `PORT` | Backend port (default: `5000`) |
| `FRONTEND_URL` | Frontend origin for CORS (default: `http://localhost:5173`) |

### 3. Configure the frontend

```bash
cd frontend
cp .env.example .env
```

Edit `frontend/.env`:

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Backend URL (default: `http://localhost:5000`) |

### 4. Run both servers

From the root:

```bash
npm run dev
```

Or individually:

```bash
npm run dev:frontend   # starts Vite dev server (default port 5173)
npm run dev:backend    # starts Express API server (default port 5000)
```

---

## Testing the Backend

Health check:

```bash
curl http://localhost:5000/api/health
# → { "status": "ok" }
```

Contact endpoint:

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello from the portfolio!"}'
```

---

## Configuring Resend

1. Create account at [resend.com](https://resend.com)
2. Add and verify your sending domain
3. Create an API key
4. Set `RESEND_API_KEY` in `backend/.env`
5. Set `CONTACT_FROM_EMAIL` to a verified sender on your domain

No API key is required to run the frontend or to test the portfolio visually. Email sending will fail gracefully with an error message if the backend is not configured.

---

## Theme System

The portfolio supports **dark** (default) and **light** themes.

- Toggle: sun/moon button in the navigation bar (desktop) and mobile menu
- Persistence: saved to `localStorage` under the key `theme`
- System preference: respects `prefers-color-scheme` if no saved preference exists
- Fallback: dark mode

---

## Build

Frontend production build:

```bash
npm run build
# output → frontend/dist/
```

Backend production build:

```bash
npm run build:backend
# output → backend/dist/
npm run start:backend
```

---

## Environment Files

| File | Committed | Purpose |
|---|---|---|
| `frontend/.env` | ❌ No | Local frontend config |
| `frontend/.env.example` | ✅ Yes | Template for frontend config |
| `backend/.env` | ❌ No | Local backend secrets |
| `backend/.env.example` | ✅ Yes | Template for backend config |
