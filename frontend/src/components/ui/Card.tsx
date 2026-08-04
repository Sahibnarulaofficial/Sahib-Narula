import React from 'react'

export type CardProps = React.HTMLAttributes<HTMLDivElement>

export const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`card-3d-gloss group relative overflow-hidden rounded-large border border-border-subtle bg-bg-surface p-6 backdrop-blur-md transition-colors duration-300 hover:border-text-secondary/50 ${className}`}
      {...props}
    >
      {/* Carbon Fiber Micro-Weave Texture Layer */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-40 transition-opacity duration-300 group-hover:opacity-65"
        style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(255, 255, 255, 0.035) 25%, transparent 25%, transparent 75%, rgba(255, 255, 255, 0.035) 75%, rgba(255, 255, 255, 0.035)),
            linear-gradient(45deg, rgba(255, 255, 255, 0.035) 25%, transparent 25%, transparent 75%, rgba(255, 255, 255, 0.035) 75%, rgba(255, 255, 255, 0.035))
          `,
          backgroundSize: '6px 6px',
          backgroundPosition: '0 0, 3px 3px',
        }}
      />

      {/* 3D Convex Gloss Sheen Layer */}
      <div className="gloss-3d-sheen pointer-events-none absolute inset-0 z-0" />

      {/* 3D Specular Top Bevel Highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/40 to-transparent shadow-[0_1px_3px_rgba(255,255,255,0.3)]" />

      {/* 3D Specular Left Bevel Highlight */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-0 w-[1px] bg-gradient-to-b from-white/30 via-white/10 to-transparent" />

      {/* Dynamic Sheen Sweep Reflection on Hover */}
      <div className="gloss-sweep z-0" />

      {/* Inner Content Container */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
