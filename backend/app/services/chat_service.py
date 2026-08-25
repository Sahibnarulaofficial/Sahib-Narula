import time
import re
import uuid
from typing import Dict, Optional
from langchain_core.messages import SystemMessage, HumanMessage
from langchain_core.output_parsers import StrOutputParser

from app.services.model_factory import ModelFactory
from app.chatbot.prompt import get_system_prompt
from app.chatbot.memory import chat_memory
from app.chatbot.knowledge_loader import knowledge_loader


class CacheEntry:
    def __init__(self, reply: str):
        self.reply = reply
        self.timestamp = time.time()


class ChatService:
    """
    Python LangChain Chatbot Orchestration Service.
    Integrates system prompts, memory context, cache, spam guards, and LLM calls.
    Uses `knowledge.md` as the exclusive single source of truth.
    """

    def __init__(self):
        self.output_parser = StrOutputParser()
        self.response_cache: Dict[str, CacheEntry] = {}
        self.cache_ttl_seconds = 1800  # 30 minutes
        self.max_session_turns = 25

    async def handle_message(self, message: str, conversation_id: Optional[str] = None) -> dict:
        active_conv_id = conversation_id.strip() if conversation_id and conversation_id.strip() else f"conv_{int(time.time())}_{uuid.uuid4().hex[:6]}"
        trimmed_message = message.strip()
        normalized_key = re.sub(r"[^\w\s]", "", trimmed_message.lower()).strip()

        # 1. Session message quota check (prevent single session token draining)
        history = chat_memory.get_history(active_conv_id)
        if len(history) >= self.max_session_turns * 2:
            return {
                "reply": "You've reached the conversation limit for this session. To discuss opportunities further, please reach out to Sahib directly at hello@sahibnarula.com!",
                "conversationId": active_conv_id,
            }

        # 2. Off-Topic / Jailbreak Filter (preserves Groq tokens on non-portfolio prompts)
        if self._is_off_topic(normalized_key):
            refusal = "I am dedicated to answering questions about Sahib Narula, his projects, and his skills. How can I help you explore his work?"
            chat_memory.add_turn(active_conv_id, trimmed_message, refusal)
            return {"reply": refusal, "conversationId": active_conv_id}

        # 3. Response Cache Check (zero tokens for repeated frequent questions)
        cached = self.response_cache.get(normalized_key)
        if cached and (time.time() - cached.timestamp < self.cache_ttl_seconds):
            chat_memory.add_turn(active_conv_id, trimmed_message, cached.reply)
            return {
                "reply": cached.reply,
                "conversationId": active_conv_id,
            }

        # 4. Initialize model
        model = ModelFactory.create_model()

        if model:
            try:
                system_prompt = get_system_prompt()
                messages = [
                    SystemMessage(content=system_prompt),
                    *history,
                    HumanMessage(content=trimmed_message),
                ]

                # LangChain pipeline execution
                chain = model | self.output_parser
                response = await chain.ainvoke(messages)
                reply = response.strip() if response else "I'm here to help with any questions about Sahib's background, skills, or projects."

                # Cache & record turn
                self._cache_response(normalized_key, reply)
                chat_memory.add_turn(active_conv_id, trimmed_message, reply)

                return {
                    "reply": reply,
                    "conversationId": active_conv_id,
                }
            except Exception as e:
                print(f"[ChatService Error] LangChain invocation failed: {e}")
                fallback_reply = self._generate_markdown_fallback(trimmed_message)
                chat_memory.add_turn(active_conv_id, trimmed_message, fallback_reply)
                return {
                    "reply": fallback_reply,
                    "conversationId": active_conv_id,
                }

        # Fallback when no LLM API key is configured
        fallback_reply = self._generate_markdown_fallback(trimmed_message)
        self._cache_response(normalized_key, fallback_reply)
        chat_memory.add_turn(active_conv_id, trimmed_message, fallback_reply)

        return {
            "reply": fallback_reply,
            "conversationId": active_conv_id,
        }

    def _is_off_topic(self, q: str) -> bool:
        off_topic_triggers = [
            "write a poem", "write a story", "write an essay", "write a song",
            "ignore previous instructions", "ignore all previous", "system prompt",
            "repeat the word", "translate to", "what is 2+", "calculate",
            "solve this", "act as dan", "jailbreak"
        ]
        return any(trigger in q for trigger in off_topic_triggers)

    def _cache_response(self, key: str, reply: str) -> None:
        if 3 < len(key) < 100:
            self.response_cache[key] = CacheEntry(reply)
            if len(self.response_cache) > 200:
                first_key = next(iter(self.response_cache))
                del self.response_cache[first_key]

    def _generate_markdown_fallback(self, query: str) -> str:
        """
        Dynamically scans the Markdown knowledge base for relevant sections if LLM is unavailable.
        Does not hardcode any personal information in Python code.
        """
        content = knowledge_loader.get_content()
        q = query.lower()

        # Search Markdown headers and paragraphs
        sections = re.split(r"\n(?=#+\s)", content)
        matching_sections = []

        for section in sections:
            header_match = re.match(r"#+\s*(.+)", section)
            header_text = header_match.group(1).lower() if header_match else ""
            if any(term in header_text or term in section.lower() for term in q.split() if len(term) > 3):
                # Clean up markdown section for display
                cleaned = section.strip()
                if cleaned:
                    matching_sections.append(cleaned)

        if matching_sections:
            return matching_sections[0]

        return "I am Blub, Sahib Narula's AI assistant. I can answer questions about his skills, projects, and background based on his knowledge base. What would you like to know?"


chat_service = ChatService()
