# Sahib Narula Portfolio — Python FastAPI Backend

Python 3.11+ FastAPI backend powering the portfolio **Contact Form (Resend API)** and the **AI Chatbot Assistant (LangChain + Groq/LLMs)**.

## Stack

- **Python**: 3.11+
- **Framework**: FastAPI + Uvicorn
- **AI Orchestration**: LangChain, LangChain Groq (`openai/gpt-oss-120b`), LangChain OpenAI, LangChain Google GenAI
- **Email Service**: Resend Python SDK
- **Data Validation**: Pydantic v2
- **Environment**: python-dotenv

## Setup & Local Development

### 1. (Optional) Create and activate virtual environment

```bash
cd backend
python -m venv .venv

# On Windows:
.venv\Scripts\activate

# On macOS/Linux:
source .venv/bin/activate
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Edit `backend/.env`:

| Variable | Description |
|---|---|
| `PORT` | Port the backend listens on (default: `5000`) |
| `FRONTEND_URL` | Frontend origin for CORS (e.g. `http://localhost:5173`) |
| `RESEND_API_KEY` | Resend API key for contact form emails |
| `CONTACT_TO_EMAIL` | Destination email for contact form submissions |
| `CONTACT_FROM_EMAIL` | Verified sender address configured in Resend |
| `LLM_PROVIDER` | `groq` (default), `openai`, or `google` |
| `GROQ_API_KEY` | Groq API Key (or `LLM_API_KEY`) |
| `LLM_MODEL` | Model identifier (e.g. `openai/gpt-oss-120b`) |
| `LLM_TEMPERATURE` | Temperature setting (default: `0.3`) |

### 4. Start the development server

```bash
uvicorn main:app --reload --port 5000
```

### 5. API Endpoints

- **Health Check**: `GET /api/health`
- **AI Chatbot**: `POST /api/chat`
  ```json
  {
    "message": "Tell me about Sahib's projects",
    "conversationId": "optional-id"
  }
  ```
- **Contact Form**: `POST /api/contact`
  ```json
  {
    "name": "Alex",
    "email": "alex@example.com",
    "message": "Hello Sahib, let's connect!"
  }
  ```

## Render Deployment

- **Environment**: Python 3
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`