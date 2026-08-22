/**
 * Abstract technical visuals for project entries.
 * Pure SVG/CSS compositions — no stock images, no screenshots.
 * Each variant visually represents the project's core concept.
 * All colors use CSS variables so they adapt to dark/light theme.
 */

interface ProjectVisualProps {
  variant: 'aptlyst' | 'reviveops'
}

/** Shared subtle grid background — uses CSS variable stroke */
function GridBg({ id }: { id: string }) {
  return (
    <defs>
      <pattern id={id} width="28" height="28" patternUnits="userSpaceOnUse">
        <path d="M 28 0 L 0 0 0 28" fill="none" stroke="var(--color-primary)" strokeWidth="0.3" />
      </pattern>
    </defs>
  )
}

/** Aptlyst AI: Audio → AI Core → Structured Output pipeline */
function AptlystVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-brand-surface border border-brand-detail overflow-hidden min-h-[220px]">
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 'var(--grid-base)' }}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <GridBg id="aptlyst-grid" />
        <rect width="100%" height="100%" fill="url(#aptlyst-grid)" />
      </svg>

      <svg
        viewBox="0 0 420 200"
        className="relative w-full max-w-sm md:max-w-md"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Aptlyst AI pipeline diagram — audio input to AI core to structured specs output"
      >
        {/* Audio waveform bars */}
        {[14, 28, 42, 20, 52, 36, 60, 24, 44, 16, 50, 30].map((h, i) => (
          <rect
            key={i}
            x={16 + i * 9}
            y={100 - h / 2}
            width="4"
            height={h}
            fill="var(--color-accent)"
            opacity={0.35 + (i % 3) * 0.1}
            rx="1"
          />
        ))}
        <text x="62" y="165" fill="var(--color-secondary)" fontSize="7" fontFamily="'JetBrains Mono', monospace" textAnchor="middle" opacity="0.5">
          AUDIO IN
        </text>

        {/* Connector line left */}
        <line x1="126" y1="100" x2="175" y2="100" stroke="var(--color-detail)" strokeWidth="1" />
        <polygon points="174,97 181,100 174,103" fill="var(--color-secondary)" opacity="0.4" />

        {/* AI processing node */}
        <circle cx="200" cy="100" r="18" fill="none" stroke="var(--color-accent)" strokeWidth="1" opacity="0.55" />
        <circle cx="200" cy="100" r="4"  fill="var(--color-accent)" opacity="0.9" />
        {/* Orbit ring */}
        <ellipse cx="200" cy="100" rx="18" ry="7" fill="none" stroke="var(--color-accent)" strokeWidth="0.5" opacity="0.25" />
        <text x="200" y="135" fill="var(--color-secondary)" fontSize="7" fontFamily="'JetBrains Mono', monospace" textAnchor="middle" opacity="0.5">
          AI CORE
        </text>

        {/* Connector line right */}
        <line x1="219" y1="100" x2="265" y2="100" stroke="var(--color-detail)" strokeWidth="1" />
        <polygon points="264,97 271,100 264,103" fill="var(--color-secondary)" opacity="0.4" />

        {/* Structured output blocks */}
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect
              x="276"
              y={84 + i * 14}
              width={40 - i * 5}
              height="9"
              fill="var(--color-surface)"
              stroke="var(--color-detail)"
              strokeWidth="0.5"
              rx="1"
            />
            <rect
              x="278"
              y={86 + i * 14}
              width={12 + i * 2}
              height="2"
              fill="var(--color-accent)"
              opacity="0.3"
              rx="1"
            />
          </g>
        ))}
        <text x="296" y="135" fill="var(--color-secondary)" fontSize="7" fontFamily="'JetBrains Mono', monospace" textAnchor="middle" opacity="0.5">
          SPECS OUT
        </text>

        {/* Jira API label */}
        <text x="296" y="148" fill="var(--color-secondary)" fontSize="6" fontFamily="'JetBrains Mono', monospace" textAnchor="middle" opacity="0.3">
          → JIRA API
        </text>

        {/* Corner coordinates */}
        <text x="8" y="16" fill="var(--color-secondary)" fontSize="6" fontFamily="'JetBrains Mono', monospace" opacity="0.25">
          00.001
        </text>
        <text x="360" y="188" fill="var(--color-secondary)" fontSize="6" fontFamily="'JetBrains Mono', monospace" opacity="0.25" textAnchor="end">
          v1.0.0
        </text>
      </svg>
    </div>
  )
}

/** ReviveOps AI: System logs → Metrics gauge → Alert output */
function ReviveOpsVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-brand-surface border border-brand-detail overflow-hidden min-h-[220px]">
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 'var(--grid-base)' }}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <GridBg id="reviveops-grid" />
        <rect width="100%" height="100%" fill="url(#reviveops-grid)" />
      </svg>

      <svg
        viewBox="0 0 420 200"
        className="relative w-full max-w-sm md:max-w-md"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="ReviveOps AI diagram — system logs to metrics monitoring to alert output"
      >
        {/* Log stream lines */}
        {[48, 64, 80, 96, 112, 128, 142].map((y, i) => (
          <g key={i}>
            <rect x="16" y={y} width={35 + (i * 7) % 25} height="5" fill="var(--color-surface)" stroke="var(--color-detail)" strokeWidth="0.4" rx="1" />
            <rect x="17" y={y + 1} width={8 + (i % 3) * 4} height="3" fill="var(--color-accent)" opacity="0.15" rx="1" />
            <text x="17" y={y + 4} fill="var(--color-secondary)" fontSize="3.5" fontFamily="'JetBrains Mono', monospace" opacity="0.5">
              {'[K8S-LOG]'}
            </text>
          </g>
        ))}
        <text x="50" y="165" fill="var(--color-secondary)" fontSize="7" fontFamily="'JetBrains Mono', monospace" textAnchor="middle" opacity="0.5">
          SYS LOGS
        </text>

        {/* Arrow */}
        <line x1="110" y1="100" x2="158" y2="100" stroke="var(--color-detail)" strokeWidth="1" />
        <polygon points="157,97 164,100 157,103" fill="var(--color-secondary)" opacity="0.4" />

        {/* Metrics gauge / semicircle */}
        <path d="M 178 115 A 25 25 0 0 1 228 115" fill="none" stroke="var(--color-detail)" strokeWidth="2" />
        <path d="M 178 115 A 25 25 0 0 1 220 90"  fill="none" stroke="var(--color-accent)" strokeWidth="2" opacity="0.65" strokeLinecap="round" />
        {/* Needle */}
        <line x1="203" y1="115" x2="216" y2="93" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" opacity="0.9" />
        <circle cx="203" cy="115" r="3" fill="var(--color-accent)" />
        {/* Tick marks */}
        {[-60, -30, 0, 30, 60].map((deg, i) => {
          const rad = (deg - 90) * (Math.PI / 180)
          const x1 = 203 + 22 * Math.cos(rad)
          const y1 = 115 + 22 * Math.sin(rad)
          const x2 = 203 + 25 * Math.cos(rad)
          const y2 = 115 + 25 * Math.sin(rad)
          return (
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="var(--color-detail)" strokeWidth="1" />
          )
        })}
        <text x="203" y="148" fill="var(--color-secondary)" fontSize="7" fontFamily="'JetBrains Mono', monospace" textAnchor="middle" opacity="0.5">
          METRICS
        </text>

        {/* Arrow */}
        <line x1="229" y1="100" x2="273" y2="100" stroke="var(--color-detail)" strokeWidth="1" />
        <polygon points="272,97 279,100 272,103" fill="var(--color-secondary)" opacity="0.4" />

        {/* Alert triangle */}
        <polygon points="303,76 326,122 280,122" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" opacity="0.7" />
        {/* Exclamation */}
        <rect x="301" y="87" width="4" height="18" rx="2" fill="var(--color-accent)" opacity="0.7" />
        <circle cx="303" cy="114" r="2.5" fill="var(--color-accent)" opacity="0.7" />
        <text x="303" y="148" fill="var(--color-secondary)" fontSize="7" fontFamily="'JetBrains Mono', monospace" textAnchor="middle" opacity="0.5">
          ALERTS
        </text>

        {/* Slack label */}
        <text x="303" y="160" fill="var(--color-secondary)" fontSize="6" fontFamily="'JetBrains Mono', monospace" textAnchor="middle" opacity="0.3">
          → SLACK
        </text>

        {/* Corner metadata */}
        <text x="8" y="16" fill="var(--color-secondary)" fontSize="6" fontFamily="'JetBrains Mono', monospace" opacity="0.25">
          00.002
        </text>
        <text x="360" y="188" fill="var(--color-secondary)" fontSize="6" fontFamily="'JetBrains Mono', monospace" opacity="0.25" textAnchor="end">
          v0.8.0-β
        </text>
      </svg>
    </div>
  )
}

export function ProjectVisual({ variant }: ProjectVisualProps) {
  if (variant === 'aptlyst') return <AptlystVisual />
  return <ReviveOpsVisual />
}
