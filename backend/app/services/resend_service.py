import html
from datetime import datetime
import resend
from app.config import settings


class ResendService:
    @staticmethod
    def send_contact_email(name: str, email: str, message: str) -> None:
        if not settings.RESEND_API_KEY:
            raise ValueError("Resend API key is not configured. Set RESEND_API_KEY in backend/.env")

        resend.api_key = settings.RESEND_API_KEY

        safe_name = html.escape(name)
        safe_email = html.escape(email)
        safe_message = html.escape(message).replace("\n", "<br/>")
        timestamp = datetime.utcnow().isoformat() + "Z"

        html_body = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Portfolio Contact</title>
  <style>
    body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f5f2; margin: 0; padding: 40px 20px; }}
    .card {{ background: #ffffff; border: 1px solid #d9d9d4; border-radius: 4px; max-width: 560px; margin: 0 auto; padding: 40px; }}
    .header {{ border-bottom: 2px solid #e10600; padding-bottom: 20px; margin-bottom: 28px; }}
    .header h1 {{ font-size: 18px; color: #111111; margin: 0 0 4px 0; font-weight: 700; letter-spacing: 0.05em; }}
    .header p {{ font-size: 12px; color: #666; margin: 0; font-family: monospace; text-transform: uppercase; letter-spacing: 0.1em; }}
    .field {{ margin-bottom: 20px; }}
    .field label {{ display: block; font-size: 10px; text-transform: uppercase; letter-spacing: 0.2em; color: #999; font-family: monospace; margin-bottom: 6px; }}
    .field .value {{ font-size: 15px; color: #111111; line-height: 1.5; }}
    .message-box {{ background: #f5f5f2; border: 1px solid #d9d9d4; border-radius: 2px; padding: 16px; }}
    .footer {{ margin-top: 32px; padding-top: 20px; border-top: 1px solid #e8e8e3; font-size: 11px; color: #999; font-family: monospace; }}
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>NEW PORTFOLIO CONTACT</h1>
      <p>sahibnarula.com &mdash; {timestamp}</p>
    </div>
    <div class="field">
      <label>Name</label>
      <div class="value">{safe_name}</div>
    </div>
    <div class="field">
      <label>Email</label>
      <div class="value"><a href="mailto:{safe_email}" style="color:#e10600;text-decoration:none;">{safe_email}</a></div>
    </div>
    <div class="field">
      <label>Message</label>
      <div class="value message-box">{safe_message}</div>
    </div>
    <div class="footer">Sent via Sahib Narula&apos;s portfolio contact form.</div>
  </div>
</body>
</html>"""

        params: resend.Emails.SendParams = {
            "from": f"Sahib Narula Portfolio <{settings.CONTACT_FROM_EMAIL}>",
            "to": [settings.CONTACT_TO_EMAIL],
            "reply_to": email,
            "subject": f"New Portfolio Contact — {name}",
            "html": html_body,
        }

        response = resend.Emails.send(params)
        if isinstance(response, dict) and response.get("error"):
            raise RuntimeError(f"Resend error: {response['error']}")
