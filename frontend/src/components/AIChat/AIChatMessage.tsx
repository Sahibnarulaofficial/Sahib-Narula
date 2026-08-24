import React from 'react';
import type { ChatMessage } from '../../services/chatApi';

interface AIChatMessageProps {
  message: ChatMessage;
}

export const AIChatMessage: React.FC<AIChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`
          max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed
          ${isUser 
            ? 'bg-brand-detail border border-brand-detail text-content-primary rounded-tr-sm' 
            : 'bg-brand-surface border border-brand-detail text-content-primary rounded-tl-sm shadow-sm'
          }
        `}
      >
        {message.content}
      </div>
    </div>
  );
};
