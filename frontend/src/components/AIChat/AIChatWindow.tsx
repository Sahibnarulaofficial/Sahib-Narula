import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { AIChatMessage as MessageComponent } from './AIChatMessage';
import { AIChatInput } from './AIChatInput';
import type { ChatMessage } from '../../services/chatApi';

interface AIChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ChatMessage[];
  onSendMessage: (msg: string) => void;
  isTyping: boolean;
  error: string | null;
}

export const AIChatWindow = forwardRef<HTMLDivElement, AIChatWindowProps>(({
  isOpen,
  onClose,
  messages,
  onSendMessage,
  isTyping,
  error
}, ref) => {
  const windowRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => windowRef.current!);

  // Auto-scroll to bottom when new messages arrive or typing status changes
  useEffect(() => {
    if (messagesEndRef.current && isOpen) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div 
      ref={windowRef}
      role="dialog"
      aria-label="Blub AI"
      aria-hidden={!isOpen}
      className={`fixed z-[9998] 
                  bottom-24 left-4 right-4 md:left-auto md:right-8 md:bottom-32 
                  w-auto md:w-[400px] h-[70vh] md:h-[540px] max-h-[600px]
                  flex flex-col
                  bg-brand-surface/95 backdrop-blur-xl
                  border border-brand-detail shadow-2xl rounded-2xl
                  overflow-hidden
                  transition-all duration-250 ease-out origin-bottom-right
                  ${isOpen ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'}
                  [body.nav-menu-open_&]:opacity-0 [body.nav-menu-open_&]:pointer-events-none
                  font-sans text-content-primary`}
    >
      {/* Background Grid Pattern (Theme-aware telemetry aesthetic) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'linear-gradient(var(--color-detail) 1px, transparent 1px), linear-gradient(90deg, var(--color-detail) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />

      {/* Header */}
      <div className="relative flex items-center justify-between p-4 border-b border-brand-detail bg-brand-surface/80 select-none">
        <div className="flex items-center gap-3">
          <div className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-wider text-content-primary font-orbitron">Blub AI</h3>
            <p className="text-[10px] uppercase tracking-widest text-content-secondary">Online · AI Assistant</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-2 text-content-secondary hover:text-content-primary transition-colors rounded-lg hover:bg-brand-detail/40"
          aria-label="Close Chat"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      {/* Messages Area */}
      <div className="relative flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <MessageComponent key={msg.id} message={msg} />
        ))}
        
        {/* Quick Questions inline */}
        {messages.length === 1 && !isTyping && (
          <div className="flex flex-wrap gap-2 mt-4 max-w-[90%]">
            {["Tell me about Sahib", "View projects", "Technical skills", "Experience", "Contact Sahib"].map((q, i) => (
              <button
                key={i}
                onClick={() => onSendMessage(q)}
                className="px-3 py-1.5 text-[11px] md:text-xs bg-brand-base/60 border border-brand-detail text-content-secondary rounded-full hover:bg-brand-detail hover:text-content-primary hover:border-accent/50 transition-colors text-left"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {isTyping && (
          <div className="flex items-center gap-1.5 p-3 w-fit bg-brand-base rounded-xl rounded-tl-sm border border-brand-detail">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        )}

        {error && (
          <div className="text-xs text-accent text-center p-2.5 border border-accent/20 rounded-lg bg-accent/5">
            {error}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <AIChatInput onSend={onSendMessage} disabled={isTyping} />
    </div>
  );
});

AIChatWindow.displayName = 'AIChatWindow';
