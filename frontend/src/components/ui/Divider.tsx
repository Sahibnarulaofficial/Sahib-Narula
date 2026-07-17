import React from 'react'

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  spacing?: 'sm' | 'md' | 'lg' | 'none'
}

export const Divider: React.FC<DividerProps> = ({ spacing = 'md', className = '', ...props }) => {
  const spacings = {
    none: 'my-0',
    sm: 'my-4',
    md: 'my-6',
    lg: 'my-8',
  }
  return (
    <hr className={`border-border-subtle border-t ${spacings[spacing]} ${className}`} {...props} />
  )
}
