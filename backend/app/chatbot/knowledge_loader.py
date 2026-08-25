import os
from pathlib import Path
from typing import Optional
from langchain_core.documents import Document


class KnowledgeLoader:
    """
    Authoritative Markdown Knowledge Base Loader for Sahib Narula's AI Assistant.
    Loads and serves `knowledge.md` as the Single Source of Truth for all personal information.
    Supports automatic timestamp-based hot-reloading.
    """

    def __init__(self):
        self._file_path = self._resolve_knowledge_path()
        self._cached_content: str = ""
        self._cached_document: Optional[Document] = None
        self._last_mtime: float = 0.0

        # Initial load and validation on instantiation
        self.reload_if_modified()

    def _resolve_knowledge_path(self) -> Path:
        """
        Reliably resolves the path to `knowledge.md` regardless of the current working directory.
        Checks module directory, app directory, and project root.
        """
        current_dir = Path(__file__).resolve().parent

        candidates = [
            current_dir / "knowledge.md",
            current_dir.parent.parent / "chatbot" / "knowledge.md",
            current_dir.parent / "knowledge.md",
            Path.cwd() / "backend" / "chatbot" / "knowledge.md",
            Path.cwd() / "chatbot" / "knowledge.md",
        ]

        for path in candidates:
            if path.is_file():
                return path

        # Default preferred location
        preferred = current_dir / "knowledge.md"
        if not preferred.exists():
            # Try to locate candidate in parent structure
            root_chatbot = current_dir.parent.parent / "chatbot" / "knowledge.md"
            if root_chatbot.exists():
                return root_chatbot

        return preferred

    @property
    def file_path(self) -> Path:
        return self._file_path

    def reload_if_modified(self) -> None:
        """
        Checks the modification timestamp of `knowledge.md` and hot-reloads if modified.
        """
        if not self._file_path.exists():
            raise FileNotFoundError(
                f"[KnowledgeLoader Error] The authoritative knowledge base file was not found at: {self._file_path}. "
                "Please ensure `backend/chatbot/knowledge.md` exists and contains your information."
            )

        current_mtime = os.path.getmtime(self._file_path)
        if current_mtime != self._last_mtime or not self._cached_content:
            with open(self._file_path, "r", encoding="utf-8") as f:
                content = f.read().strip()

            self._cached_content = content
            self._cached_document = Document(
                page_content=content,
                metadata={"source": str(self._file_path), "type": "markdown_knowledge_base"}
            )
            self._last_mtime = current_mtime
            print(f"[KnowledgeLoader] Loaded knowledge base from {self._file_path} ({len(content)} chars)")

    def get_content(self) -> str:
        """
        Returns the raw Markdown content of the knowledge base.
        Automatically hot-reloads if the file has been modified on disk.
        """
        self.reload_if_modified()
        return self._cached_content

    def get_document(self) -> Document:
        """
        Returns the knowledge base as a LangChain Document.
        """
        self.reload_if_modified()
        return self._cached_document


# Singleton loader instance
knowledge_loader = KnowledgeLoader()
