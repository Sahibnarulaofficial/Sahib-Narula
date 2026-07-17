import React from 'react'

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  as: Component = 'h2',
  className = '',
  ...props
}) => {
  return (
    <div className={`flex flex-col ${className}`} {...props}>
      <Component className="text-text-muted font-mono text-xs font-semibold tracking-widest uppercase">
        {title}
      </Component>
      {subtitle && (
        <p className="text-text-secondary font-mono text-[10px] uppercase">{subtitle}</p>
      )}
    </div>
  )
}
