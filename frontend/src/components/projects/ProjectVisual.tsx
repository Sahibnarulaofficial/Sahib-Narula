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

/** Aptlyst AI: Bot Config & Org Management → AI Streaming Runtime → Live Website Embed Widget */
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
        viewBox="0 0 440 216"
        className="relative w-full max-w-sm md:max-w-md lg:max-w-lg p-1 sm:p-2"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Aptlyst AI platform diagram — organization chatbot configuration, AI streaming gateway, and live website chatbot deployment"
      >
        {/* ── Top & Bottom Technical Metadata ── */}
        <text x="18" y="16" fill="var(--color-secondary)" fontSize="5.5" fontFamily="'JetBrains Mono', monospace" opacity="0.45" letterSpacing="0.08em">
          00.001 // SAAS INFRASTRUCTURE
        </text>
        <text x="422" y="16" fill="var(--color-accent)" fontSize="5.5" fontFamily="'JetBrains Mono', monospace" opacity="0.65" textAnchor="end" letterSpacing="0.08em">
          LIVE EMBED RUNTIME
        </text>

        {/* ── 1. LEFT PANEL: SAAS PLATFORM & BOT CONFIG ── */}
        <g id="saas-config-panel">
          {/* Main Card */}
          <rect
            x="18"
            y="26"
            width="134"
            height="164"
            rx="3"
            fill="var(--color-surface)"
            stroke="var(--color-detail)"
            strokeWidth="0.8"
          />

          {/* Window Header */}
          <path d="M 18 29 Q 18 26 21 26 L 149 26 Q 152 26 152 29 L 152 44 L 18 44 Z" fill="var(--color-detail)" opacity="0.4" />
          <line x1="18" y1="44" x2="152" y2="44" stroke="var(--color-detail)" strokeWidth="0.8" />
          <circle cx="27" cy="35" r="1.8" fill="var(--color-secondary)" opacity="0.4" />
          <circle cx="33" cy="35" r="1.8" fill="var(--color-secondary)" opacity="0.4" />
          <circle cx="39" cy="35" r="1.8" fill="var(--color-secondary)" opacity="0.4" />
          <text x="48" y="37.5" fill="var(--color-secondary)" fontSize="5.5" fontFamily="'JetBrains Mono', monospace" opacity="0.8" fontWeight="600">
            APTLYST // CONFIG
          </text>

          {/* Org & Status Row */}
          <rect x="25" y="51" width="70" height="11" rx="2" fill="var(--color-detail)" opacity="0.5" />
          <text x="29" y="58.5" fill="var(--color-primary)" fontSize="4.8" fontFamily="'JetBrains Mono', monospace" fontWeight="500">
            ORG: ACME_CORP
          </text>
          <circle cx="120" cy="56.5" r="2.2" fill="var(--color-accent)" />
          <circle cx="120" cy="56.5" r="4.5" fill="none" stroke="var(--color-accent)" strokeWidth="0.5" opacity="0.4" />
          <text x="128" y="58.5" fill="var(--color-secondary)" fontSize="4.5" fontFamily="'JetBrains Mono', monospace" opacity="0.7">
            PROD
          </text>

          {/* AI Persona Setup Row */}
          <text x="25" y="72" fill="var(--color-secondary)" fontSize="4.5" fontFamily="'JetBrains Mono', monospace" opacity="0.5" letterSpacing="0.05em">
            ASSISTANT PARAMETERS
          </text>
          
          <rect x="25" y="76" width="120" height="14" rx="2" fill="none" stroke="var(--color-detail)" strokeWidth="0.6" />
          <text x="30" y="85" fill="var(--color-secondary)" fontSize="4.6" fontFamily="'JetBrains Mono', monospace">
            MODEL: GPT-4o / STREAM
          </text>

          <rect x="25" y="93" width="120" height="14" rx="2" fill="none" stroke="var(--color-detail)" strokeWidth="0.6" />
          <circle cx="32" cy="100" r="1.8" fill="var(--color-accent)" opacity="0.7" />
          <text x="38" y="102" fill="var(--color-secondary)" fontSize="4.6" fontFamily="'JetBrains Mono', monospace">
            KNOWLEDGE BASE (RAG)
          </text>
          <text x="139" y="102" fill="var(--color-accent)" fontSize="4.2" fontFamily="'JetBrains Mono', monospace" textAnchor="end" opacity="0.8">
            SYNCED
          </text>

          {/* Prompt Mockup Lines */}
          <rect x="25" y="112" width="78" height="2.5" rx="1.2" fill="var(--color-detail)" />
          <rect x="25" y="117" width="108" height="2.5" rx="1.2" fill="var(--color-detail)" />
          <rect x="25" y="122" width="62" height="2.5" rx="1.2" fill="var(--color-detail)" />

          {/* Divider */}
          <line x1="25" y1="131" x2="145" y2="131" stroke="var(--color-detail)" strokeWidth="0.6" />

          {/* Usage & Telemetry */}
          <text x="25" y="141" fill="var(--color-secondary)" fontSize="4.5" fontFamily="'JetBrains Mono', monospace" opacity="0.5" letterSpacing="0.05em">
            USAGE & QUOTA
          </text>
          <text x="145" y="141" fill="var(--color-secondary)" fontSize="4.5" fontFamily="'JetBrains Mono', monospace" textAnchor="end" opacity="0.7">
            86.4%
          </text>

          <rect x="25" y="146" width="120" height="3.5" rx="1.5" fill="var(--color-detail)" />
          <rect x="25" y="146" width="104" height="3.5" rx="1.5" fill="var(--color-accent)" opacity="0.75" />

          <text x="25" y="159" fill="var(--color-secondary)" fontSize="4.5" fontFamily="'JetBrains Mono', monospace" opacity="0.55">
            AUTH: API_GATEWAY
          </text>
          <text x="145" y="159" fill="var(--color-accent)" fontSize="4.2" fontFamily="'JetBrains Mono', monospace" textAnchor="end" opacity="0.7">
            ACTIVE
          </text>

          <rect x="25" y="165" width="120" height="16" rx="2" fill="var(--color-detail)" opacity="0.25" stroke="var(--color-detail)" strokeWidth="0.5" />
          <text x="85" y="175" fill="var(--color-secondary)" fontSize="4.6" fontFamily="'JetBrains Mono', monospace" textAnchor="middle" opacity="0.8">
            &lt;script src="aptlyst.js"&gt;
          </text>
        </g>

        {/* ── 2. CENTER CONDUIT & AI ENGINE GATEWAY ── */}
        <g id="ai-gateway-conduit">
          {/* Connecting Data Bus Lines */}
          <line x1="152" y1="108" x2="190" y2="108" stroke="var(--color-detail)" strokeWidth="1" />
          <polygon points="189,105 195,108 189,111" fill="var(--color-secondary)" opacity="0.45" />

          <line x1="228" y1="108" x2="268" y2="108" stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="3 2" opacity="0.7" />
          <polygon points="266,105 272,108 266,111" fill="var(--color-accent)" opacity="0.8" />

          {/* AI Core Node */}
          <circle cx="209" cy="108" r="21" fill="none" stroke="var(--color-accent)" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />
          <ellipse cx="209" cy="108" rx="25" ry="10" fill="none" stroke="var(--color-detail)" strokeWidth="0.8" opacity="0.6" />
          <circle cx="209" cy="108" r="13" fill="var(--color-surface)" stroke="var(--color-accent)" strokeWidth="1" opacity="0.9" />
          <circle cx="209" cy="108" r="4.5" fill="var(--color-accent)" />

          {/* Core Labels */}
          <text x="209" y="80" fill="var(--color-primary)" fontSize="5.5" fontFamily="'JetBrains Mono', monospace" textAnchor="middle" fontWeight="600" letterSpacing="0.06em">
            AI CORE
          </text>
          <text x="209" y="88" fill="var(--color-secondary)" fontSize="4.2" fontFamily="'JetBrains Mono', monospace" textAnchor="middle" opacity="0.6">
            STREAMING RUNTIME
          </text>

          <text x="209" y="137" fill="var(--color-secondary)" fontSize="4.6" fontFamily="'JetBrains Mono', monospace" textAnchor="middle" opacity="0.5">
            LATENCY
          </text>
          <text x="209" y="146" fill="var(--color-accent)" fontSize="5.2" fontFamily="'JetBrains Mono', monospace" textAnchor="middle" fontWeight="600">
            38ms
          </text>
        </g>

        {/* ── 3. RIGHT PANEL: CLIENT WEBSITE & EMBEDDED CHATBOT ── */}
        <g id="website-embed-panel">
          {/* Browser Window Frame */}
          <rect
            x="272"
            y="26"
            width="150"
            height="164"
            rx="3"
            fill="var(--color-surface)"
            stroke="var(--color-detail)"
            strokeWidth="0.8"
          />

          {/* Browser Header Bar */}
          <path d="M 272 29 Q 272 26 275 26 L 419 26 Q 422 26 422 29 L 422 44 L 272 44 Z" fill="var(--color-detail)" opacity="0.4" />
          <line x1="272" y1="44" x2="422" y2="44" stroke="var(--color-detail)" strokeWidth="0.8" />
          <circle cx="280" cy="35" r="1.8" fill="var(--color-secondary)" opacity="0.4" />
          <circle cx="286" cy="35" r="1.8" fill="var(--color-secondary)" opacity="0.4" />
          <circle cx="292" cy="35" r="1.8" fill="var(--color-secondary)" opacity="0.4" />

          {/* Address Bar */}
          <rect x="302" y="30" width="112" height="10" rx="2" fill="var(--color-base)" stroke="var(--color-detail)" strokeWidth="0.5" />
          <circle cx="308" cy="35" r="1.2" fill="var(--color-accent)" opacity="0.8" />
          <text x="313" y="37.2" fill="var(--color-secondary)" fontSize="4.5" fontFamily="'JetBrains Mono', monospace" opacity="0.65">
            client-website.com
          </text>

          {/* Host Website Background Skeleton Layout */}
          <rect x="280" y="52" width="28" height="3" rx="1" fill="var(--color-detail)" opacity="0.5" />
          <rect x="390" y="52" width="24" height="3" rx="1" fill="var(--color-detail)" opacity="0.4" />
          <rect x="280" y="60" width="56" height="4" rx="1" fill="var(--color-detail)" opacity="0.5" />
          <rect x="280" y="66" width="40" height="2.5" rx="1" fill="var(--color-detail)" opacity="0.3" />

          {/* ── EMBEDDED CHATBOT WIDGET OVERLAY ── */}
          {/* Widget Container */}
          <rect
            x="280"
            y="74"
            width="134"
            height="110"
            rx="3"
            fill="var(--color-base)"
            stroke="var(--color-accent)"
            strokeWidth="0.9"
          />

          {/* Chatbot Widget Header */}
          <path d="M 280 77 Q 280 74 283 74 L 411 74 Q 414 74 414 77 L 414 91 L 280 91 Z" fill="var(--color-surface)" />
          <line x1="280" y1="91" x2="414" y2="91" stroke="var(--color-detail)" strokeWidth="0.6" />

          {/* Bot Avatar Icon */}
          <circle cx="289" cy="82.5" r="4.5" fill="var(--color-accent)" opacity="0.2" stroke="var(--color-accent)" strokeWidth="0.6" />
          <circle cx="289" cy="82.5" r="1.8" fill="var(--color-accent)" />
          <text x="297" y="84.5" fill="var(--color-primary)" fontSize="5.2" fontFamily="'JetBrains Mono', monospace" fontWeight="600">
            Aptlyst Assistant
          </text>

          {/* Online Status Indicator */}
          <circle cx="396" cy="82.5" r="1.8" fill="#22c55e" />
          <text x="401" y="84.2" fill="var(--color-secondary)" fontSize="3.8" fontFamily="'JetBrains Mono', monospace" opacity="0.7">
            ONLINE
          </text>

          {/* Conversational Stream: User Message */}
          <rect x="330" y="97" width="76" height="15" rx="2" fill="var(--color-detail)" opacity="0.7" />
          <text x="335" y="107" fill="var(--color-primary)" fontSize="4.5" fontFamily="'JetBrains Mono', monospace">
            How do I get started?
          </text>

          {/* Conversational Stream: AI Bot Response */}
          <rect
            x="286"
            y="117"
            width="122"
            height="27"
            rx="2"
            fill="var(--color-surface)"
            stroke="var(--color-detail)"
            strokeWidth="0.6"
          />
          <text x="292" y="126.5" fill="var(--color-secondary)" fontSize="4.4" fontFamily="'JetBrains Mono', monospace">
            Embed 1 snippet on your site
          </text>
          <text x="292" y="135.5" fill="var(--color-secondary)" fontSize="4.4" fontFamily="'JetBrains Mono', monospace">
            to launch custom AI support.
          </text>

          {/* Real-time Streaming Dots Indicator */}
          <circle cx="396" cy="134" r="1.1" fill="var(--color-accent)" opacity="0.3" />
          <circle cx="400" cy="134" r="1.1" fill="var(--color-accent)" opacity="0.6" />
          <circle cx="404" cy="134" r="1.1" fill="var(--color-accent)" opacity="1" />

          {/* Chat Widget Input Field */}
          <rect
            x="286"
            y="149"
            width="122"
            height="14"
            rx="2"
            fill="var(--color-surface)"
            stroke="var(--color-detail)"
            strokeWidth="0.6"
          />
          <text x="292" y="158" fill="var(--color-secondary)" fontSize="4.2" fontFamily="'JetBrains Mono', monospace" opacity="0.4">
            Type your message...
          </text>
          
          {/* Send Button */}
          <rect x="396" y="151.5" width="9.5" height="9" rx="1.5" fill="var(--color-accent)" />
          <path d="M 399 156 L 403 156 M 401.5 154.5 L 403.5 156 L 401.5 157.5" stroke="#FFFFFF" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />

          {/* Live Deployment Pill Tag */}
          <text x="347" y="176" fill="var(--color-accent)" fontSize="4.2" fontFamily="'JetBrains Mono', monospace" textAnchor="middle" opacity="0.85" letterSpacing="0.04em">
            ● WEBSITE EMBEDDED
          </text>
        </g>

        {/* ── Bottom Bar Metadata ── */}
        <text x="18" y="204" fill="var(--color-secondary)" fontSize="5" fontFamily="'JetBrains Mono', monospace" opacity="0.35">
          MULTI-TENANT ORG INFRASTRUCTURE
        </text>
        <text x="422" y="204" fill="var(--color-secondary)" fontSize="5" fontFamily="'JetBrains Mono', monospace" opacity="0.35" textAnchor="end">
          v1.0.0 // PRODUCTION
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
