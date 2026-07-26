import React, { useState, useEffect, useRef, useCallback } from 'react'

/**
 * HeroBackground — Formula 1 Blueprint Only
 *
 * This component renders ONLY the F1 car blueprint wireframe
 * with its living illumination system.
 *
 * All global layers (noise, grid, telemetry, scanline, glow)
 * are handled by GlobalBackground.tsx which spans the entire website.
 */

type BlueprintPart =
  'frontWing' | 'wheels' | 'suspension' | 'chassis' | 'cockpit' | 'rearWing' | 'centerPulse'

export const HeroBackground: React.FC = () => {
  const [drawReady, setDrawReady] = useState(false)
  const [aliveReady, setAliveReady] = useState(false)

  const [partStates, setPartStates] = useState<Record<BlueprintPart, 'dim' | 'normal' | 'glow'>>({
    frontWing: 'normal',
    wheels: 'normal',
    suspension: 'normal',
    chassis: 'normal',
    cockpit: 'normal',
    rearWing: 'normal',
    centerPulse: 'normal',
  })

  const mousePosRef = useRef({ x: 0, y: 0 })
  const [smoothMouse, setSmoothMouse] = useState({ x: 0, y: 0 })

  // ─── Blueprint Draw Timing (syncs with global boot) ───
  useEffect(() => {
    const timers = [
      setTimeout(() => setDrawReady(true), 2000),
      setTimeout(() => setAliveReady(true), 6000),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  // ─── Living Blueprint: Independent Part Illumination ───
  const schedulePart = useCallback((part: BlueprintPart) => {
    const scheduleNext = () => {
      const wait = 4000 + Math.random() * 8000
      const timeout = setTimeout(() => {
        const action = Math.random()
        if (action < 0.4) {
          setPartStates((prev) => ({ ...prev, [part]: 'glow' }))
          setTimeout(
            () => {
              setPartStates((prev) => ({ ...prev, [part]: 'normal' }))
              scheduleNext()
            },
            800 + Math.random() * 600,
          )
        } else if (action < 0.7) {
          setPartStates((prev) => ({ ...prev, [part]: 'dim' }))
          setTimeout(
            () => {
              setPartStates((prev) => ({ ...prev, [part]: 'normal' }))
              scheduleNext()
            },
            2000 + Math.random() * 3000,
          )
        } else {
          scheduleNext()
        }
      }, wait)
      return timeout
    }
    return scheduleNext()
  }, [])

  useEffect(() => {
    if (!aliveReady) return
    const parts: BlueprintPart[] = [
      'frontWing',
      'wheels',
      'suspension',
      'chassis',
      'cockpit',
      'rearWing',
      'centerPulse',
    ]
    const timeouts = parts.map((p) => schedulePart(p))
    return () => timeouts.forEach(clearTimeout)
  }, [aliveReady, schedulePart])

  // ─── Mouse Parallax ───
  useEffect(() => {
    let raf: number
    let cx = 0
    let cy = 0
    const onMove = (e: MouseEvent) => {
      mousePosRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      }
    }
    const tick = () => {
      cx += (mousePosRef.current.x - cx) * 0.035
      cy += (mousePosRef.current.y - cy) * 0.035
      setSmoothMouse({ x: cx, y: cy })
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  const bpTx = `translate3d(${smoothMouse.x * 5}px, ${smoothMouse.y * 5}px, 0)`

  const partOpacity = (part: BlueprintPart): number => {
    const s = partStates[part]
    if (s === 'glow') return 1
    if (s === 'dim') return 0.15
    return 0.6
  }
  const partStroke = (part: BlueprintPart, base = 'rgba(255,255,255,0.8)'): string => {
    return partStates[part] === 'glow' ? 'rgba(255,255,255,0.9)' : base
  }
  const partWidth = (part: BlueprintPart): string => {
    return partStates[part] === 'glow' ? '1.8' : '1.1'
  }

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* F1 BLUEPRINT — 35-40% viewport width, right side */}
      <div
        className="absolute top-1/2 right-0 hidden h-full w-[38vw] -translate-y-1/2 transition-opacity duration-[2500ms] sm:block"
        style={{
          opacity: drawReady ? 1 : 0,
          transform: bpTx,
          willChange: 'transform',
        }}
      >
        <svg
          viewBox="0 0 460 1020"
          className="h-full w-full"
          preserveAspectRatio="xMaxYMid meet"
          xmlns="http://www.w3.org/2000/svg"
          shapeRendering="geometricPrecision"
        >
          <defs>
            <linearGradient id="v-pulse" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#B8B8B8" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.03" />
            </linearGradient>
          </defs>

          <g opacity="0.07" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {/* ── FRONT WING ASSEMBLY ── */}
            <g
              stroke={partStroke('frontWing')}
              strokeWidth={partWidth('frontWing')}
              className="transition-all duration-[800ms]"
              style={{ opacity: partOpacity('frontWing') }}
            >
              <path d="M 55 115 L 55 65 L 130 55 L 220 45 L 310 55 L 385 65 L 385 115 Z" />
              <path d="M 60 78 L 380 78" strokeDasharray="4 3" />
              <path d="M 58 90 L 382 90" strokeDasharray="3 3" />
              <path d="M 56 102 L 384 102" strokeDasharray="2 3" />
              <rect x="42" y="55" width="13" height="72" rx="2" />
              <rect x="385" y="55" width="13" height="72" rx="2" />
              <path d="M 38 55 L 55 70 M 38 127 L 55 112" />
              <path d="M 402 55 L 385 70 M 402 127 L 385 112" />
              <path d="M 42 130 L 55 130 L 55 140 L 48 140 Z" />
              <path d="M 398 130 L 385 130 L 385 140 L 392 140 Z" />
              <line x1="180" y1="115" x2="185" y2="155" />
              <line x1="260" y1="115" x2="255" y2="155" />
              <path d="M 190 120 L 185 220 L 178 310 L 262 310 L 255 220 L 250 120 Z" />
              <line x1="188" y1="170" x2="252" y2="170" strokeDasharray="2 3" />
              <line x1="186" y1="220" x2="254" y2="220" strokeDasharray="2 3" />
              <line x1="182" y1="270" x2="258" y2="270" strokeDasharray="2 3" />
              <path d="M 210 155 L 210 175 L 230 175 L 230 155" />
            </g>

            {/* ── WHEELS & BRAKES ── */}
            <g
              stroke={partStroke('wheels')}
              strokeWidth={partWidth('wheels')}
              className="transition-all duration-[800ms]"
              style={{ opacity: partOpacity('wheels') }}
            >
              {/* Front Left */}
              <rect x="10" y="200" width="48" height="115" rx="7" />
              <circle cx="34" cy="257.5" r="16" />
              <circle cx="34" cy="257.5" r="6" />
              <circle cx="34" cy="257.5" r="2.5" fill="rgba(255,255,255,0.12)" />
              <line x1="34" y1="241.5" x2="34" y2="273.5" />
              <line x1="18" y1="257.5" x2="50" y2="257.5" />
              <line x1="22.7" y1="246.2" x2="45.3" y2="268.8" />
              <line x1="45.3" y1="246.2" x2="22.7" y2="268.8" />
              <rect x="58" y="248" width="10" height="20" rx="1.5" stroke="rgba(255,255,255,0.4)" />

              {/* Front Right */}
              <rect x="382" y="200" width="48" height="115" rx="7" />
              <circle cx="406" cy="257.5" r="16" />
              <circle cx="406" cy="257.5" r="6" />
              <circle cx="406" cy="257.5" r="2.5" fill="rgba(255,255,255,0.12)" />
              <line x1="406" y1="241.5" x2="406" y2="273.5" />
              <line x1="390" y1="257.5" x2="422" y2="257.5" />
              <line x1="394.7" y1="246.2" x2="417.3" y2="268.8" />
              <line x1="417.3" y1="246.2" x2="394.7" y2="268.8" />
              <rect
                x="372"
                y="248"
                width="10"
                height="20"
                rx="1.5"
                stroke="rgba(255,255,255,0.4)"
              />

              {/* Rear Left */}
              <rect x="2" y="745" width="58" height="138" rx="7" />
              <circle cx="31" cy="814" r="20" />
              <circle cx="31" cy="814" r="8" />
              <circle cx="31" cy="814" r="3" fill="rgba(255,255,255,0.12)" />
              <line x1="31" y1="794" x2="31" y2="834" />
              <line x1="11" y1="814" x2="51" y2="814" />
              <line x1="16.9" y1="799.9" x2="45.1" y2="828.1" />
              <line x1="45.1" y1="799.9" x2="16.9" y2="828.1" />
              <rect x="60" y="804" width="12" height="22" rx="1.5" stroke="rgba(255,255,255,0.4)" />

              {/* Rear Right */}
              <rect x="380" y="745" width="58" height="138" rx="7" />
              <circle cx="409" cy="814" r="20" />
              <circle cx="409" cy="814" r="8" />
              <circle cx="409" cy="814" r="3" fill="rgba(255,255,255,0.12)" />
              <line x1="409" y1="794" x2="409" y2="834" />
              <line x1="389" y1="814" x2="429" y2="814" />
              <line x1="394.9" y1="799.9" x2="423.1" y2="828.1" />
              <line x1="423.1" y1="799.9" x2="394.9" y2="828.1" />
              <rect
                x="368"
                y="804"
                width="12"
                height="22"
                rx="1.5"
                stroke="rgba(255,255,255,0.4)"
              />
            </g>

            {/* ── SUSPENSION GEOMETRY ── */}
            <g
              stroke={partStroke('suspension')}
              strokeWidth={partWidth('suspension')}
              className="transition-all duration-[800ms]"
              style={{ opacity: partOpacity('suspension') }}
            >
              <path d="M 58 220 L 180 295 M 58 300 L 180 295" />
              <path d="M 382 220 L 260 295 M 382 300 L 260 295" />
              <line x1="58" y1="258" x2="185" y2="285" strokeDasharray="3 2" />
              <line x1="382" y1="258" x2="255" y2="285" strokeDasharray="3 2" />
              <line
                x1="58"
                y1="270"
                x2="190"
                y2="298"
                stroke="rgba(255,255,255,0.35)"
                strokeDasharray="2 4"
              />
              <line
                x1="382"
                y1="270"
                x2="250"
                y2="298"
                stroke="rgba(255,255,255,0.35)"
                strokeDasharray="2 4"
              />
              <path d="M 60 810 L 168 745 M 60 775 L 168 745" />
              <path d="M 380 810 L 272 745 M 380 775 L 272 745" />
              <line x1="60" y1="790" x2="172" y2="752" strokeDasharray="3 2" />
              <line x1="380" y1="790" x2="268" y2="752" strokeDasharray="3 2" />
              <line
                x1="60"
                y1="814"
                x2="175"
                y2="760"
                stroke="rgba(255,255,255,0.25)"
                strokeDasharray="5 3"
              />
              <line
                x1="380"
                y1="814"
                x2="265"
                y2="760"
                stroke="rgba(255,255,255,0.25)"
                strokeDasharray="5 3"
              />
            </g>

            {/* ── CHASSIS & SIDEPODS ── */}
            <g
              stroke={partStroke('chassis')}
              strokeWidth={partWidth('chassis')}
              className="transition-all duration-[800ms]"
              style={{ opacity: partOpacity('chassis') }}
            >
              <path d="M 178 310 L 140 440 L 135 520 L 138 650 L 165 740 L 172 855 L 268 855 L 275 740 L 302 650 L 305 520 L 300 440 L 262 310 Z" />
              <path d="M 140 370 L 115 400 L 118 450 L 140 440" stroke="rgba(255,255,255,0.45)" />
              <path d="M 300 370 L 325 400 L 322 450 L 300 440" stroke="rgba(255,255,255,0.45)" />
              <line x1="120" y1="410" x2="135" y2="430" stroke="rgba(255,255,255,0.25)" />
              <line x1="320" y1="410" x2="305" y2="430" stroke="rgba(255,255,255,0.25)" />
              <path d="M 135 445 L 170 445 L 170 505 L 135 505" />
              <path d="M 305 445 L 270 445 L 270 505 L 305 505" />
              <line x1="142" y1="520" x2="165" y2="520" />
              <line x1="142" y1="535" x2="165" y2="535" />
              <line x1="142" y1="550" x2="165" y2="550" />
              <line x1="275" y1="520" x2="298" y2="520" />
              <line x1="275" y1="535" x2="298" y2="535" />
              <line x1="275" y1="550" x2="298" y2="550" />
              <path
                d="M 138 580 L 125 650 L 145 740"
                strokeDasharray="4 3"
                stroke="rgba(255,255,255,0.35)"
              />
              <path
                d="M 302 580 L 315 650 L 295 740"
                strokeDasharray="4 3"
                stroke="rgba(255,255,255,0.35)"
              />
              <ellipse cx="148" cy="395" rx="6" ry="3" />
              <ellipse cx="292" cy="395" rx="6" ry="3" />
              <path d="M 205 545 L 205 560 L 235 560 L 235 545" />
              <path d="M 218 560 L 218 740 L 222 740 L 222 560" />
              <line
                x1="220"
                y1="560"
                x2="220"
                y2="780"
                strokeDasharray="5 5"
                stroke="rgba(255,255,255,0.25)"
              />
              <circle cx="205" cy="740" r="4" />
              <circle cx="235" cy="740" r="4" />
              <line x1="175" y1="860" x2="175" y2="878" />
              <line x1="195" y1="860" x2="195" y2="878" />
              <line x1="245" y1="860" x2="245" y2="878" />
              <line x1="265" y1="860" x2="265" y2="878" />
              <rect x="212" y="850" width="16" height="20" rx="2" />
            </g>

            {/* ── COCKPIT, HALO & STEERING ── */}
            <g
              stroke={partStroke('cockpit')}
              strokeWidth={partWidth('cockpit')}
              className="transition-all duration-[800ms]"
              style={{ opacity: partOpacity('cockpit') }}
            >
              <path d="M 188 400 L 188 520 A 22 22 0 0 0 252 520 L 252 400 Z" />
              <path d="M 220 405 L 220 395 L 195 430 M 220 395 L 245 430" strokeWidth="1.5" />
              <rect x="205" y="525" width="30" height="18" rx="5" />
              <line x1="220" y1="415" x2="220" y2="510" strokeDasharray="2 4" />
              <line x1="195" y1="460" x2="245" y2="460" strokeDasharray="2 4" />
              <rect x="206" y="438" width="28" height="14" rx="3" />
              <line x1="213" y1="441" x2="213" y2="449" />
              <line x1="220" y1="441" x2="220" y2="449" />
              <line x1="227" y1="441" x2="227" y2="449" />
              <rect x="215" y="538" width="10" height="6" rx="1" fill="rgba(255,255,255,0.08)" />
            </g>

            {/* ── REAR WING ── */}
            <g
              stroke={partStroke('rearWing')}
              strokeWidth={partWidth('rearWing')}
              className="transition-all duration-[800ms]"
              style={{ opacity: partOpacity('rearWing') }}
            >
              <path d="M 90 880 L 90 950 L 350 950 L 350 880 Z" strokeWidth="1.3" />
              <path d="M 90 880 L 350 880" strokeWidth="1.6" />
              <path d="M 90 950 L 350 950" strokeWidth="1.6" />
              <line x1="90" y1="915" x2="350" y2="915" />
              <rect x="210" y="872" width="20" height="82" rx="3" stroke="rgba(255,255,255,0.45)" />
              <line x1="92" y1="890" x2="92" y2="940" strokeDasharray="3 5" />
              <line x1="95" y1="890" x2="95" y2="940" strokeDasharray="3 5" />
              <line x1="348" y1="890" x2="348" y2="940" strokeDasharray="3 5" />
              <line x1="345" y1="890" x2="345" y2="940" strokeDasharray="3 5" />
              <rect x="214" y="955" width="12" height="4" rx="1" fill="rgba(255,255,255,0.06)" />
            </g>

            {/* ── DIMENSION LINES ── */}
            <g
              className="transition-opacity duration-[1500ms]"
              style={{ opacity: drawReady ? 0.5 : 0 }}
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="0.8"
            >
              <line x1="8" y1="185" x2="432" y2="185" strokeDasharray="3 4" />
              <line x1="8" y1="178" x2="8" y2="192" stroke="rgba(255,255,255,0.5)" />
              <line x1="432" y1="178" x2="432" y2="192" stroke="rgba(255,255,255,0.5)" />
              <text
                x="220"
                y="180"
                fill="rgba(255,255,255,0.4)"
                fontSize="7"
                fontFamily="monospace"
                textAnchor="middle"
              >
                WIDTH :: 2000 mm
              </text>
              <line x1="445" y1="55" x2="445" y2="955" strokeDasharray="3 4" />
              <line x1="438" y1="55" x2="452" y2="55" stroke="rgba(255,255,255,0.5)" />
              <line x1="438" y1="955" x2="452" y2="955" stroke="rgba(255,255,255,0.5)" />
              <text
                x="450"
                y="505"
                fill="rgba(255,255,255,0.4)"
                fontSize="7"
                fontFamily="monospace"
                transform="rotate(90, 450, 505)"
                textAnchor="middle"
              >
                LENGTH :: 5640 mm
              </text>
              <line
                x1="34"
                y1="257"
                x2="34"
                y2="814"
                stroke="rgba(255,255,255,0.15)"
                strokeDasharray="2 6"
              />
              <text
                x="28"
                y="535"
                fill="rgba(255,255,255,0.2)"
                fontSize="6"
                fontFamily="monospace"
                transform="rotate(90, 28, 535)"
                textAnchor="middle"
              >
                WB 3600
              </text>
            </g>

            {/* ── CENTER PULSE LINE ── */}
            <g
              className="transition-all duration-[800ms]"
              style={{ opacity: partOpacity('centerPulse') }}
            >
              {(aliveReady || partStates.centerPulse === 'glow') && (
                <path
                  d="M 220 50 L 220 960"
                  fill="none"
                  stroke="url(#v-pulse)"
                  strokeWidth="2"
                  strokeDasharray="80 420"
                  className="animate-pulse-fast"
                />
              )}
            </g>
          </g>
        </svg>
      </div>
    </div>
  )
}
