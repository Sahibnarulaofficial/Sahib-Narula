import os
from pathlib import Path
from dotenv import load_dotenv

# Load .env from backend root
env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

def get_env(key: str, default: str = "") -> str:
    return os.getenv(key, default)

class Settings:
    # Server & CORS
    PORT: int = int(get_env("PORT", "5000"))
    FRONTEND_URL: str = get_env("FRONTEND_URL", "http://localhost:5173")
    IS_PRODUCTION: bool = get_env("NODE_ENV", "").lower() == "production" or get_env("ENVIRONMENT", "").lower() == "production"

    # Resend Email Configuration (Preserved exact names)
    RESEND_API_KEY: str = get_env("RESEND_API_KEY", "")
    CONTACT_TO_EMAIL: str = get_env("CONTACT_TO_EMAIL", "hello@sahibnarula.com")
    CONTACT_FROM_EMAIL: str = get_env("CONTACT_FROM_EMAIL", "noreply@sahibnarula.com")

    # LangChain / AI Chatbot Configuration
    LLM_PROVIDER: str = get_env("LLM_PROVIDER", "groq").lower()
    LLM_API_KEY: str = get_env("LLM_API_KEY", get_env("GROQ_API_KEY", get_env("OPENAI_API_KEY", get_env("GOOGLE_API_KEY", ""))))
    LLM_MODEL: str = get_env("LLM_MODEL", "openai/gpt-oss-120b")
    LLM_TEMPERATURE: float = float(get_env("LLM_TEMPERATURE", "0.3"))

    # Rate Limiting & Anti-Spam
    CHAT_BURST_MAX: int = int(get_env("CHAT_BURST_MAX", "3"))           # max requests per 10s
    CHAT_SUSTAINED_MAX: int = int(get_env("CHAT_SUSTAINED_MAX", "20"))   # max requests per 15m
    CHAT_DAILY_MAX: int = int(get_env("CHAT_DAILY_MAX", "60"))           # max requests per 24h

settings = Settings()
