import { API_BASE_URL } from '../lib/api';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const sendChatMessage = async (
  message: string,
  conversationId: string | null = null,
): Promise<{ reply: string; conversationId?: string; error?: string }> => {
  const endpoint = import.meta.env.VITE_CHAT_API_URL || `${API_BASE_URL}/api/chat`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, conversationId }),
    });

    let data: any;
    try {
      data = await response.json();
    } catch {
      data = { success: false, error: 'Unable to parse server response.' };
    }

    if (!response.ok || data.success === false) {
      const errorMsg =
        data.error ||
        data.message ||
        "I'm having trouble connecting right now. Please try again in a moment.";
      return { reply: '', error: errorMsg };
    }

    return {
      reply: data.reply || "I'm here to answer questions about Sahib's work and skills.",
      conversationId: data.conversationId,
    };
  } catch (err) {
    console.error('[ChatAPI Error]', err);
    return {
      reply: '',
      error: "Unable to reach the server. Please check your connection or try again in a moment.",
    };
  }
};
