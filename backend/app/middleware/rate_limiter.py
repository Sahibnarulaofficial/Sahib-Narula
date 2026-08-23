import time
from typing import Dict, List
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import JSONResponse
from app.config import settings


class ClientTracker:
    def __init__(self):
        self.burst_timestamps: List[float] = []
        self.sustained_timestamps: List[float] = []
        self.daily_timestamps: List[float] = []


class ChatRateLimiterMiddleware(BaseHTTPMiddleware):
    """
    Lightweight, multi-tiered in-memory rate limiter protecting the chat and contact endpoints.
    """

    def __init__(self, app):
        super().__init__(app)
        self.clients: Dict[str, ClientTracker] = {}
        self.last_cleanup = time.time()

    async def dispatch(self, request: Request, call_next):
        # Only rate limit chat and contact endpoints
        if request.url.path in ("/api/chat", "/api/contact") and request.method == "POST":
            client_ip = request.client.host if request.client else "unknown"
            now = time.time()
            self._cleanup_if_needed(now)

            if client_ip not in self.clients:
                self.clients[client_ip] = ClientTracker()
            tracker = self.clients[client_ip]

            # 1. Burst check (10s window)
            tracker.burst_timestamps = [t for t in tracker.burst_timestamps if now - t < 10]
            if len(tracker.burst_timestamps) >= settings.CHAT_BURST_MAX:
                return JSONResponse(
                    status_code=429,
                    content={"success": False, "error": "You're sending messages too fast. Please wait a few seconds."},
                )

            # 2. Sustained check (15m window)
            tracker.sustained_timestamps = [t for t in tracker.sustained_timestamps if now - t < 900]
            if len(tracker.sustained_timestamps) >= settings.CHAT_SUSTAINED_MAX:
                return JSONResponse(
                    status_code=429,
                    content={"success": False, "error": "Message rate limit reached. Please wait a few minutes before trying again."},
                )

            # 3. Daily check (24h window)
            tracker.daily_timestamps = [t for t in tracker.daily_timestamps if now - t < 86400]
            if len(tracker.daily_timestamps) >= settings.CHAT_DAILY_MAX:
                return JSONResponse(
                    status_code=429,
                    content={"success": False, "error": "Daily message limit reached. Please reach out to Sahib directly at hello@sahibnarula.com!"},
                )

            # Record this request
            tracker.burst_timestamps.append(now)
            tracker.sustained_timestamps.append(now)
            tracker.daily_timestamps.append(now)

        return await call_next(request)

    def _cleanup_if_needed(self, now: float) -> None:
        if now - self.last_cleanup > 600:  # Every 10 minutes
            self.last_cleanup = now
            expired = []
            for ip, tracker in self.clients.items():
                tracker.daily_timestamps = [t for t in tracker.daily_timestamps if now - t < 86400]
                if not tracker.daily_timestamps:
                    expired.append(ip)
            for ip in expired:
                del self.clients[ip]
