import React, { useState, useCallback, useEffect, useRef } from 'react';
import { AIAssistant } from './AIAssistant';
import { AIChatWindow } from './AIChatWindow';
import { sendChatMessage, type ChatMessage } from '../../services/chatApi';

const INITIAL_MESSAGE: ChatMessage = {
  id: 'init',
  role: 'assistant',
  content: "Hey, I'm Blub, Sahib's AI assistant. Ask me about his projects, skills, experience, or anything else you'd like to know.",
  timestamp: new Date()
};

export const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Unread badge and preview bubble states
  const [hasUnread, setHasUnread] = useState(true);
  const [bubbleMessage, setBubbleMessage] = useState<string | null>(null);
  const [isBubbleVisible, setIsBubbleVisible] = useState(false);

  const chatWindowRef = useRef<HTMLDivElement>(null);
  const assistantButtonRef = useRef<HTMLButtonElement>(null);
  const bubbleTimerRef = useRef<ReturnType<typeof setTimeout>>();

  // Track conversation ID
  const [conversationId] = useState(() => Math.random().toString(36).substring(7));

  // Initialize with welcome message on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([INITIAL_MESSAGE]);
    }
  }, [isOpen, messages.length]);

  // Initial welcome bubble on page load (pops up after 2.5s, fades out after 7.5s)
  useEffect(() => {
    const initialTimer = setTimeout(() => {
      if (!isOpen) {
        setBubbleMessage("Hey, I'm Blub! Ask me about Sahib's projects & skills.");
        setIsBubbleVisible(true);

        bubbleTimerRef.current = setTimeout(() => {
          setIsBubbleVisible(false);
        }, 7500);
      }
    }, 2500);

    return () => {
      clearTimeout(initialTimer);
      if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
    };
  }, []);

  // When chat window opens, clear unread status and hide bubble
  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setIsBubbleVisible(false);
      if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
    }
  }, [isOpen]);

  // Auto-hide chat window on click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      
      const isInsideChat = chatWindowRef.current?.contains(target);
      const isInsideAssistant = assistantButtonRef.current?.contains(target);

      if (!isInsideChat && !isInsideAssistant) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  const handleSendMessage = useCallback(async (content: string) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);
    setError(null);

    const { reply, error: apiError } = await sendChatMessage(content, conversationId);

    setIsTyping(false);
    
    if (apiError) {
      setError(apiError);
    } else if (reply) {
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: reply,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMsg]);

      // If user closed the chat window while awaiting response, notify with red dot & preview bubble
      if (!isOpen) {
        setHasUnread(true);
        const preview = reply.length > 80 ? reply.slice(0, 77) + '...' : reply;
        setBubbleMessage(preview);
        setIsBubbleVisible(true);

        if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
        bubbleTimerRef.current = setTimeout(() => {
          setIsBubbleVisible(false);
        }, 7500);
      }
    }
  }, [conversationId, isOpen]);

  const handleCloseBubble = () => {
    setIsBubbleVisible(false);
    if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
  };

  return (
    <>
      <AIChatWindow 
        ref={chatWindowRef}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        messages={messages}
        onSendMessage={handleSendMessage}
        isTyping={isTyping}
        error={error}
      />

      <AIAssistant 
        ref={assistantButtonRef}
        isOpen={isOpen} 
        onClick={() => setIsOpen(prev => !prev)}
        hasUnread={hasUnread}
        bubbleMessage={bubbleMessage}
        isBubbleVisible={isBubbleVisible}
        onCloseBubble={handleCloseBubble}
      />
    </>
  );
};
