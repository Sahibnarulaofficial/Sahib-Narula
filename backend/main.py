import os
from contextlib import asynccontextmanager
import uvicorn
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError

from app.config import settings
from app.middleware.rate_limiter import ChatRateLimiterMiddleware
from app.chatbot.knowledge_loader import knowledge_loader
from app.routes.health import router as health_router
from app.routes.contact import router as contact_router
from app.routes.chat import router as chat_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Validate that the Markdown knowledge base exists and is loaded
    try:
        content = knowledge_loader.get_content()
        print(f"[Startup] Authoritative Markdown knowledge base loaded from: {knowledge_loader.file_path} ({len(content)} characters)")
    except Exception as e:
        print(f"[Startup Fatal] Failed to load knowledge base: {e}")
        raise e
    yield


app = FastAPI(
    title="Sahib Narula Portfolio Backend",
    description="Python FastAPI backend powering Contact Form (Resend) and AI Chatbot Assistant (LangChain + Markdown Knowledge Base)",
    version="2.1.0",
    lifespan=lifespan,
)

# ── Rate Limiting Middleware ──────────────────────────────────────────────────
app.add_middleware(ChatRateLimiterMiddleware)

# ── CORS ──────────────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
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
    ║  Health:    http://127.0.0.1:{port}/api/health            ║
    ║  Chat:      http://127.0.0.1:{port}/api/chat              ║
    ║  Contact:   http://127.0.0.1:{port}/api/contact           ║
    ║  Knowledge: {str(knowledge_loader.file_path):<45}║
    ╚═══════════════════════════════════════════════════════════╝
    """)
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
