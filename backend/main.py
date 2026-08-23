import os
import uvicorn
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError

from app.config import settings
from app.middleware.rate_limiter import ChatRateLimiterMiddleware
from app.routes.health import router as health_router
from app.routes.contact import router as contact_router
from app.routes.chat import router as chat_router

app = FastAPI(
    title="Sahib Narula Portfolio Backend",
    description="Python FastAPI backend powering Contact Form (Resend) and AI Chatbot Assistant (LangChain + Groq/LLMs)",
    version="2.0.0",
)

# ── Rate Limiting Middleware ──────────────────────────────────────────────────
app.add_middleware(ChatRateLimiterMiddleware)

# ── CORS ──────────────────────────────────────────────────────────────────────
# Support configured FRONTEND_URL and local dev URLs
allowed_origins = [
    origin.strip() for origin in settings.FRONTEND_URL.split(",") if origin.strip()
]
# Ensure localhost variations are included for local development
for dev_origin in ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000"]:
    if dev_origin not in allowed_origins:
        allowed_origins.append(dev_origin)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# ── Validation Error Handler ──────────────────────────────────────────────────
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(_request: Request, exc: RequestValidationError):
    first_error = exc.errors()[0]
    msg = first_error.get("msg", "Invalid request data.")
    return JSONResponse(
        status_code=400,
        content={"success": False, "error": msg},
    )

# ── Routes ────────────────────────────────────────────────────────────────────
app.include_router(health_router)
app.include_router(contact_router)
app.include_router(chat_router)


if __name__ == "__main__":
    port = int(os.getenv("PORT", settings.PORT))
    print(f"""
    ╔═══════════════════════════════════════════════════════════╗
    ║  Sahib Narula — Python FastAPI Portfolio Backend          ║
    ║  Server running on http://0.0.0.0:{port}                  ║
    ║  Health: http://127.0.0.1:{port}/api/health               ║
    ║  Chat:   http://127.0.0.1:{port}/api/chat                 ║
    ║  Contact:http://127.0.0.1:{port}/api/contact              ║
    ╚═══════════════════════════════════════════════════════════╝
    """)
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
