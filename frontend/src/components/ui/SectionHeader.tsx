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
    <div className={`flex flex-col gap-1.5 ${className}`} {...props}>
      <Component className="text-text-primary font-orbitron text-xl font-bold tracking-wider uppercase sm:text-2xl md:text-3xl">
        {title}
      </Component>
      {subtitle && (
        <p className="text-text-secondary font-sans text-xs font-medium tracking-wider uppercase">{subtitle}</p>
      )}
    </div>
  )
}
