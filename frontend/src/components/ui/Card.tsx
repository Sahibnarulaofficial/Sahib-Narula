import React from 'react'

export type CardProps = React.HTMLAttributes<HTMLDivElement>

export const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`rounded-large border-border-subtle bg-bg-surface/30 shadow-subtle border p-6 transition-all duration-200 active:scale-[0.98] ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
