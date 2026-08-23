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
            ? 'bg-[#1A1A1A] border border-[#333333] text-[#F5F5F5] rounded-tr-sm' 
            : 'bg-transparent border border-[#222222] text-[#E0E0E0] rounded-tl-sm shadow-sm'
          }
        `}
      >
        {message.content}
      </div>
    </div>
  );
};
