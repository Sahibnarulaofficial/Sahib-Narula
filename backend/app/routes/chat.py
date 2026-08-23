import re
from typing import Optional
from fastapi import APIRouter, status
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field, field_validator
from app.services.chat_service import chat_service

router = APIRouter(prefix="/api", tags=["chat"])


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=2, max_length=350)
    conversationId: Optional[str] = Field(None, max_length=100)

    @field_validator("message")
    @classmethod
    def validate_message(cls, v: str) -> str:
        trimmed = v.strip()
        if not trimmed:
            raise ValueError("Message cannot be empty.")
        # Reject extreme repetitive character spam (e.g. "aaaaaaaaaaaaaaa")
        if re.search(r"(.)\1{14,}", trimmed):
            raise ValueError("Message contains invalid repetitive characters.")
        return trimmed


@router.post("/chat")
async def handle_chat(payload: ChatRequest):
    try:
        result = await chat_service.handle_message(
            message=payload.message,
            conversation_id=payload.conversationId,
        )
        return {
            "success": True,
            "reply": result["reply"],
            "conversationId": result["conversationId"],
        }
    except Exception as e:
        print(f"[Chat Route Error] {e}")
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"success": False, "error": "Unable to process your request right now."},
        )
