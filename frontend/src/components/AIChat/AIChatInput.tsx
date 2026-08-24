import React, { useState, useRef, useEffect } from 'react';

interface AIChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const AIChatInput: React.FC<AIChatInputProps> = ({ onSend, disabled }) => {
  const [input, setInput] = useState('');
  const [cooldown, setCooldown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled && !cooldown) {
      onSend(input.trim());
      setInput('');
      setCooldown(true);
      setTimeout(() => setCooldown(false), 1200);
    }
  };

  // Keep focus when disabled becomes false
  useEffect(() => {
    if (!disabled && !cooldown && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled, cooldown]);

  const isDisabled = disabled || cooldown;

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-brand-detail bg-brand-surface/90">
      <div className="relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={input}
          maxLength={350}
          onChange={(e) => setInput(e.target.value)}
          placeholder={cooldown ? "Please wait a moment..." : "Ask about Sahib's work..."}
          disabled={isDisabled}
          className="w-full bg-brand-base border border-brand-detail rounded-full py-3 pl-4 pr-12 
                     text-sm text-content-primary placeholder:text-content-secondary/60
                     focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50
                     transition-all disabled:opacity-50"
          aria-label="Chat input"
        />
        <button
          type="submit"
          disabled={!input.trim() || isDisabled}
          className="absolute right-2 p-2 rounded-full text-content-secondary hover:text-accent 
                     disabled:opacity-40 disabled:hover:text-content-secondary transition-colors
                     bg-brand-base hover:bg-brand-detail"
          aria-label="Send message"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </form>
  );
};
