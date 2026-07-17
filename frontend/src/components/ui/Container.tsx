import React from 'react'

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  clean?: boolean
}

export const Container: React.FC<ContainerProps> = ({
  children,
  clean = false,
  className = '',
  ...props
}) => {
  const baseClass = clean ? '' : 'mx-auto w-full max-w-5xl px-6'
  return (
    <div className={`${baseClass} ${className}`} {...props}>
      {children}
    </div>
  )
}
