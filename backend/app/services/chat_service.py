import time
import re
import uuid
from typing import Dict, Optional
from langchain_core.messages import SystemMessage, HumanMessage
from langchain_core.output_parsers import StrOutputParser

from app.services.model_factory import ModelFactory
from app.chatbot.prompt import get_system_prompt
from app.chatbot.memory import chat_memory
from app.chatbot.knowledge import PORTFOLIO_DATA


class CacheEntry:
    def __init__(self, reply: str):
        self.reply = reply
        self.timestamp = time.time()


class ChatService:
    """
    Python LangChain Chatbot Orchestration Service.
    Integrates system prompts, memory context, cache, spam guards, and LLM calls.
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
            refusal = "I'm specifically focused on Sahib Narula's portfolio, projects, and skills. Feel free to ask about Aptlyst AI, ReviveOps AI, or his tech stack!"
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
                reply = response.strip() if response else "I'm here to help with any questions about Sahib's portfolio, skills, or projects."

                # Cache & record turn
                self._cache_response(normalized_key, reply)
                chat_memory.add_turn(active_conv_id, trimmed_message, reply)

                return {
                    "reply": reply,
                    "conversationId": active_conv_id,
                }
            except Exception as e:
                print(f"[ChatService Error] LangChain invocation failed: {e}")
                fallback_reply = self._generate_local_fallback(trimmed_message)
                chat_memory.add_turn(active_conv_id, trimmed_message, fallback_reply)
                return {
                    "reply": fallback_reply,
                    "conversationId": active_conv_id,
                }

        # Local deterministic knowledge engine when no LLM API key is configured
        fallback_reply = self._generate_local_fallback(trimmed_message)
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

    def _generate_local_fallback(self, query: str) -> str:
        q = query.lower()

        if any(k in q for k in ["project", "built", "work", "portfolio"]):
            projects_list = "\n".join([
                f"• **{p['name']}** ({p['tagline']}) - {p['description']}"
                for p in PORTFOLIO_DATA["projects"]
            ])
            return f"Sahib has built high-performance systems including:\n\n{projects_list}\n\nYou can explore more details in the Projects section above."

        if "aptlyst" in q:
            aptlyst = next((p for p in PORTFOLIO_DATA["projects"] if "APTLYST" in p["name"]), None)
            if aptlyst:
                return (
                    f"**{aptlyst['name']}** ({aptlyst['tagline']}):\n{aptlyst['description']}\n\n"
                    f"• **Technologies**: {', '.join(aptlyst['technologies'])}\n"
                    f"• **Architecture**: {', '.join(aptlyst['architecture'])}"
                )

        if "reviveops" in q:
            reviveops = next((p for p in PORTFOLIO_DATA["projects"] if "REVIVEOPS" in p["name"]), None)
            if reviveops:
                return (
                    f"**{reviveops['name']}** ({reviveops['tagline']}):\n{reviveops['description']}\n\n"
                    f"• **Technologies**: {', '.join(reviveops['technologies'])}\n"
                    f"• **Status**: {reviveops['status']}"
                )

        if any(k in q for k in ["skill", "stack", "technolog", "tool", "language"]):
            skills = ", ".join([s["name"] for s in PORTFOLIO_DATA["tech_stack"]])
            return f"Sahib's technical expertise spans:\n\n{skills}\n\nHe specializes in low-latency web apps, modular AI microservices, and reactive data pipelines."

        if any(k in q for k in ["experience", "intern", "ibm", "bleep"]):
            return "Sahib's background includes technical internships at **IBM SkillsBuild** (AI Automation & Intelligent Solutions) and **Bleep**. Feel free to download his resume at /resume.pdf for full chronological history."

        if any(k in q for k in ["education", "college", "degree", "university", "bca"]):
            edu = PORTFOLIO_DATA["education"]
            return f"Sahib is pursuing a **{edu['degree']}** at **{edu['institution']}** (Expected graduation: {edu['graduation_year']})."

        if any(k in q for k in ["contact", "email", "reach", "hire", "touch", "linkedin"]):
            return f"You can reach Sahib directly via email at **{PORTFOLIO_DATA['owner']['email']}** or by submitting a message in the Contact section on this page."

        if any(k in q for k in ["who", "sahib", "about", "tell me about"]):
            return "**Sahib Narula** is a systems engineer, AI builder, and software craftsman specializing in low-latency web applications, modular AI microservices, and reactive data pipelines. How can I help you explore his work today?"

        return "I'm Blub, Sahib's AI assistant. I can answer questions about Sahib's projects (like Aptlyst AI and ReviveOps AI), technical skills, education, experience, or how to get in touch. What would you like to know?"


chat_service = ChatService()
