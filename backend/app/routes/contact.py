import re
from fastapi import APIRouter, status
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field, field_validator
from app.services.resend_service import ResendService

router = APIRouter(prefix="/api", tags=["contact"])

EMAIL_REGEX = re.compile(r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")


class ContactRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: str = Field(..., min_length=5, max_length=254)
    message: str = Field(..., min_length=10, max_length=4000)

    @field_validator("name", "message")
    @classmethod
    def strip_and_validate_non_empty(cls, v: str) -> str:
        trimmed = v.strip()
        if not trimmed:
            raise ValueError("Field cannot be empty or only whitespace.")
        return trimmed

    @field_validator("email")
    @classmethod
    def validate_email_format(cls, v: str) -> str:
        trimmed = v.strip()
        if not EMAIL_REGEX.match(trimmed):
            raise ValueError("A valid email address is required.")
        return trimmed.lower()


@router.post("/contact")
async def handle_contact(payload: ContactRequest):
    try:
        ResendService.send_contact_email(
            name=payload.name,
            email=payload.email,
            message=payload.message,
        )
        return {"success": True, "message": "Message sent successfully."}
    except Exception as e:
        print(f"[Contact Error] Failed to send email: {e}")
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"success": False, "message": "Failed to send email. Please try again or email directly."},
        )
