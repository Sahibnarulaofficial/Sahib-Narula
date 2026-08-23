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
    <form onSubmit={handleSubmit} className="p-4 border-t border-[#333333] bg-[#111111]/90">
      <div className="relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={input}
          maxLength={350}
          onChange={(e) => setInput(e.target.value)}
          placeholder={cooldown ? "Please wait a moment..." : "Ask about Sahib's work..."}
          disabled={isDisabled}
          className="w-full bg-[#1A1A1A] border border-[#333333] rounded-full py-3 pl-4 pr-12 
                     text-sm text-[#F5F5F5] placeholder-[#666666]
                     focus:outline-none focus:border-[#E10600]/50 focus:ring-1 focus:ring-[#E10600]/50
                     transition-all disabled:opacity-50"
          aria-label="Chat input"
        />
        <button
          type="submit"
          disabled={!input.trim() || isDisabled}
          className="absolute right-2 p-2 rounded-full text-[#A0A0A0] hover:text-[#E10600] 
                     disabled:opacity-50 disabled:hover:text-[#A0A0A0] transition-colors
                     bg-[#1A1A1A] hover:bg-[#222222]"
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
