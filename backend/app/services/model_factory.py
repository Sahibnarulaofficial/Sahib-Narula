from typing import Optional
from langchain_core.language_models.chat_models import BaseChatModel
from app.config import settings


class ModelFactory:
    """
    Factory for instantiating LangChain chat models dynamically based on environment config.
    """

    @staticmethod
    def create_model() -> Optional[BaseChatModel]:
        api_key = settings.LLM_API_KEY
        if not api_key:
            return None

        provider = settings.LLM_PROVIDER.lower()
        model_name = settings.LLM_MODEL
        temperature = settings.LLM_TEMPERATURE
        max_tokens = 300  # Hard limit to preserve token economy

        if provider == "groq":
            from langchain_groq import ChatGroq
            return ChatGroq(
                api_key=api_key,
                model_name=model_name or "openai/gpt-oss-120b",
                temperature=temperature,
                max_tokens=max_tokens,
            )

        elif provider in ("google", "gemini"):
            from langchain_google_genai import ChatGoogleGenerativeAI
            return ChatGoogleGenerativeAI(
                api_key=api_key,
                model=model_name or "gemini-1.5-flash",
                temperature=temperature,
                max_output_tokens=max_tokens,
            )

        elif provider == "openai":
            from langchain_openai import ChatOpenAI
            return ChatOpenAI(
                api_key=api_key,
                model_name=model_name or "gpt-4o-mini",
                temperature=temperature,
                max_tokens=max_tokens,
            )

        else:
            # Default to ChatGroq or ChatOpenAI
            from langchain_groq import ChatGroq
            return ChatGroq(
                api_key=api_key,
                model_name=model_name or "openai/gpt-oss-120b",
                temperature=temperature,
                max_tokens=max_tokens,
            )
