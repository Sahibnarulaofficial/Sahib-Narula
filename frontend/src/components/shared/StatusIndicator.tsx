import React from 'react'

export interface StatusIndicatorProps {
  color?: 'red' | 'green' | 'yellow'
  litCount?: number
  status?: 'active' | 'inactive' | 'loading'
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  color = 'red',
  litCount = 4,
}) => {
  const totalLights = 5

  const lightStyles = {
    red: {
      lit: 'bg-[radial-gradient(ellipse_at_30%_30%,#fca5a5_0%,#ef4444_45%,#7f1d1d_100%)] shadow-[0_0_8px_rgba(239,68,68,0.7)] border-red-400/40 animate-pulse',
      unlit: 'bg-zinc-900/90 border-zinc-800/80 shadow-inner',
    },
    green: {
      lit: 'bg-[radial-gradient(ellipse_at_30%_30%,#86efac_0%,#22c55e_45%,#14532d_100%)] shadow-[0_0_8px_rgba(34,197,94,0.7)] border-emerald-400/40 animate-pulse',
      unlit: 'bg-zinc-900/90 border-zinc-800/80 shadow-inner',
    },
    yellow: {
      lit: 'bg-[radial-gradient(ellipse_at_30%_30%,#fde047_0%,#eab308_45%,#713f12_100%)] shadow-[0_0_8px_rgba(234,179,8,0.7)] border-yellow-400/40 animate-pulse',
      unlit: 'bg-zinc-900/90 border-zinc-800/80 shadow-inner',
    },
  }

  return (
    <div
      className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800/80 bg-zinc-950/90 px-2.5 py-1.5 shadow-md backdrop-blur-xs"
      aria-label={`Race start light status: ${color}`}
      title={`START LIGHTS: ${color.toUpperCase()}`}
    >
      {Array.from({ length: totalLights }).map((_, index) => {
        const isLit = index < litCount
        const currentStyle = lightStyles[color]

        return (
          <span
            key={index}
            className={`h-2.5 w-2.5 rounded-full border transition-all duration-300 ${
              isLit ? currentStyle.lit : currentStyle.unlit
            }`}
          />
        )
      })}
    </div>
  )
}
