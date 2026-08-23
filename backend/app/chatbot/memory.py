import time
from typing import Dict, List
from langchain_core.messages import BaseMessage, HumanMessage, AIMessage


class ConversationEntry:
    def __init__(self, messages: List[BaseMessage]):
        self.messages: List[BaseMessage] = messages
        self.last_active: float = time.time()


class ChatMemoryStore:
    """
    Lightweight in-memory conversation memory manager with TTL session cleanup.
    Modular design for future swap with Redis or SQL database.
    """

    def __init__(self, max_messages_per_session: int = 10, session_ttl_seconds: int = 3600):
        self.store: Dict[str, ConversationEntry] = {}
        self.max_messages_per_session = max_messages_per_session
        self.session_ttl_seconds = session_ttl_seconds

    def get_history(self, conversation_id: str) -> List[BaseMessage]:
        self._prune_expired()
        entry = self.store.get(conversation_id)
        if not entry:
            return []

        entry.last_active = time.time()
        return list(entry.messages)

    def add_turn(self, conversation_id: str, user_message: str, assistant_reply: str) -> None:
        self._prune_expired()
        entry = self.store.get(conversation_id)
        if not entry:
            entry = ConversationEntry([])
            self.store[conversation_id] = entry

        entry.messages.append(HumanMessage(content=user_message))
        entry.messages.append(AIMessage(content=assistant_reply))
        entry.last_active = time.time()

        if len(entry.messages) > self.max_messages_per_session:
            entry.messages = entry.messages[-self.max_messages_per_session:]

    def clear(self, conversation_id: str) -> None:
        if conversation_id in self.store:
            del self.store[conversation_id]

    def _prune_expired(self) -> None:
        now = time.time()
        expired_keys = [
            cid for cid, entry in self.store.items()
            if now - entry.last_active > self.session_ttl_seconds
        ]
        for cid in expired_keys:
            del self.store[cid]


chat_memory = ChatMemoryStore()
