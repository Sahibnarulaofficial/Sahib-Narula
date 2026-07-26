import React, { useState, useEffect } from 'react'

interface DiagnostisLine {
  label: string
  dots: string
  activeValue: string
  completedValue: string
}

export interface StartupExperienceProps {
  onComplete: () => void
}

export const StartupExperience: React.FC<StartupExperienceProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState<number>(0)

  // Detect if user has already visited in this session (e.g. reload or returning visit)
  const [isReload] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('project_garage_visited') === 'true'
    } catch {
      return false
    }
  })

  // Mark session flag on initial mount
  useEffect(() => {
    try {
      sessionStorage.setItem('project_garage_visited', 'true')
    } catch {
      // ignore in restricted environments
    }
  }, [])

  const lines: DiagnostisLine[] = [
    {
      label: 'PRECISION',
      dots: ' ........ ',
      activeValue: 'INITIALIZING...',
      completedValue: 'ONLINE',
    },
    {
      label: 'PERFORMANCE',
      dots: ' ..... ',
      activeValue: 'CONNECTING...',
      completedValue: 'ONLINE',
    },
    {
      label: 'CREATIVITY',
      dots: ' ....... ',
      activeValue: 'LOADING...',
      completedValue: 'ONLINE',
    },
    {
      label: 'INNOVATION',
      dots: ' ....... ',
      activeValue: 'SYNCING...',
      completedValue: 'ONLINE',
    },
  ]

  // Loading progress loop over 1800ms (reload) or 4800ms (first time)
  useEffect(() => {
    let animationFrameId: number
    const duration = isReload ? 1800 : 4800
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime
      const nextProgress = Math.min((elapsedTime / duration) * 100, 100)
      setProgress(nextProgress)
      if (nextProgress < 100) {
        animationFrameId = requestAnimationFrame(animate)
      } else if (isReload) {
        // Automatically proceed to hero section on reload as soon as track animation fills
        const autoTimer = setTimeout(() => {
          onComplete()
        }, 300)
        return () => clearTimeout(autoTimer)
      }
    }

    animationFrameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrameId)
  }, [isReload, onComplete])

  const currentStep = Math.min(Math.floor(progress / 25), lines.length)

  // Uncropped Circuit de Spa-Francorchamps path centered in 1700x1100 viewBox
  const spaTrackPath = [
    'M 430,805',
    'C 350,805 310,735 330,675',
    'C 350,615 410,575 470,535',
    'C 510,505 540,475 560,435',
    'C 610,355 670,275 770,195',
    'C 850,135 930,105 1010,115',
    'C 1090,125 1150,155 1170,195',
    'C 1190,225 1180,265 1160,295',
    'C 1140,325 1110,335 1090,355',
    'C 1070,375 1060,405 1080,445',
    'C 1100,485 1150,515 1200,555',
    'C 1250,595 1310,625 1350,675',
    'C 1390,725 1390,785 1350,825',
    'C 1310,865 1230,885 1150,875',
    'C 1070,865 1010,845 950,825',
    'C 890,805 850,795 810,805',
    'C 750,815 710,845 690,895',
    'C 670,935 650,965 630,985',
    'C 590,995 530,975 500,935',
    'C 470,895 460,855 470,825',
    'C 480,805 490,803 510,803',
    'C 540,803 580,810 600,820',
    'C 630,830 650,825 660,805',
    'C 675,785 665,755 640,745',
    'C 610,735 560,740 530,765',
    'C 490,785 450,805 430,805',
    'Z',
  ].join(' ')

  return (
    <div
      className="text-text-primary fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black select-none"
      role="dialog"
      aria-modal="true"
      aria-label="System Startup Loading Overlay"
    >
      {/* 100% Full-Screen Pitch-Black Background & Circuit Glow */}
      <div className="pointer-events-none fixed inset-0 h-full w-full bg-black" />
      <div className="pointer-events-none fixed inset-0 h-full w-full bg-[radial-gradient(ellipse_75%_55%_at_50%_50%,rgba(160,25,20,0.25),rgba(90,15,10,0.12)_48%,transparent_80%)]" />

      {/* Global Engineering Blueprint Grid System */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px),
            linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px, 60px 60px, 20px 20px, 20px 20px',
          animation: 'gridDrift 25s ease-in-out infinite alternate',
        }}
      />

      {/* Engineering Noise Texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
      />

      {/* Engineering Coordinate Markings */}
      <div className="pointer-events-none absolute inset-0 font-mono text-[7px] tracking-[0.2em] text-zinc-400 opacity-[0.04]">
        <div className="absolute top-5 left-4 sm:left-6">BOOT_SEQUENCE // X:45.2 Y:108.7</div>
        <div className="absolute top-5 right-5">TELEMETRY_REF :: STARTUP</div>
        <div className="absolute bottom-5 left-4 sm:left-6">LATENCY :: 12ms</div>
        <div className="absolute right-5 bottom-5">PORT :: 9810</div>
      </div>

      <div className="pointer-events-none fixed inset-0 h-full w-full bg-[radial-gradient(ellipse_100%_90%_at_50%_50%,transparent_30%,rgba(0,0,0,0.95)_80%)]" />

      {/* 3D Perspective Scene Container */}
      <div
        className={`pointer-events-none absolute inset-0 z-0 flex items-center justify-center ${
          isReload ? 'flex' : 'hidden md:flex'
        }`}
        style={{
          perspective: '1400px',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Layer 1: Ground Plane */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: 'rotateX(54deg) rotateZ(-7deg) scale(1.35)',
            transformStyle: 'preserve-3d',
          }}
        >
          <svg
            className="h-full w-full"
            viewBox="0 0 1700 1100"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="geometricPrecision"
          >
            <defs>
              <filter id="ground-shadow-blur" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="12" />
              </filter>
              <filter id="ground-spill-blur" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="24" />
              </filter>
            </defs>

            {/* Dark cast shadow resting on floor */}
            <path
              d={spaTrackPath}
              fill="none"
              stroke="#000000"
              strokeWidth="28"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#ground-shadow-blur)"
              opacity="0.92"
            />

            {/* Red light spill reflecting on floor */}
            <path
              d={spaTrackPath}
              fill="none"
              stroke="#ff0022"
              strokeWidth="38"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength="100"
              strokeDasharray="100"
              strokeDashoffset={100 - progress}
              filter="url(#ground-spill-blur)"
              opacity="0.4"
              style={{ willChange: 'stroke-dashoffset' }}
            />
          </svg>
        </div>

        {/* Layer 2: Floating 3D Track Line */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: 'rotateX(54deg) rotateZ(-7deg) scale(1.35) translateY(-24px)',
            transformStyle: 'preserve-3d',
          }}
        >
          <svg
            className="h-full w-full"
            viewBox="0 0 1700 1100"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="geometricPrecision"
          >
            {/* Dark Guide Track Line */}
            <path
              d={spaTrackPath}
              fill="none"
              stroke="#1f1816"
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.6"
            />

            {/* Sharp Outer Red Tube */}
            <path
              d={spaTrackPath}
              fill="none"
              stroke="#ff0033"
              strokeWidth="9"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength="100"
              strokeDasharray="100"
              strokeDashoffset={100 - progress}
              opacity="0.95"
              style={{
                willChange: 'stroke-dashoffset',
                filter: 'drop-shadow(0 0 8px #ff0022)',
              }}
            />

            {/* Sharp Hot White Core Line */}
            <path
              d={spaTrackPath}
              fill="none"
              stroke="#ffffff"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength="100"
              strokeDasharray="100"
              strokeDashoffset={100 - progress}
              opacity="1.0"
              style={{
                willChange: 'stroke-dashoffset',
                filter: 'drop-shadow(0 0 3px #ffffff)',
              }}
            />
          </svg>
        </div>
      </div>

      {/* Centered Project Garage Card (Only shown on initial first-time load) */}
      {!isReload && (
        <div className="relative z-10 w-full max-w-xs font-mono">
          <div className="rounded-medium flex flex-col gap-8 border border-zinc-800/80 bg-black/85 p-6 shadow-2xl backdrop-blur-md md:p-10">
            {/* Mobile inline track */}
            <div className="mb-2 flex justify-center md:hidden">
              <svg
                width="200"
                height="200"
                viewBox="0 0 1700 1100"
                preserveAspectRatio="xMidYMid meet"
                className="w-full max-w-[200px]"
              >
                <path
                  d={spaTrackPath}
                  fill="none"
                  stroke="#2a2a2a"
                  strokeWidth="20"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d={spaTrackPath}
                  fill="none"
                  stroke="#ff0033"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset={100 - progress}
                  opacity="0.9"
                />
                <path
                  d={spaTrackPath}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset={100 - progress}
                  opacity="1"
                />
              </svg>
            </div>

            {/* Header */}
            <div className="flex flex-col gap-1.5 text-center sm:text-left">
              <h1 className="text-text-primary text-base font-bold tracking-widest uppercase">
                PROJECT GARAGE
              </h1>
              <span className="text-text-secondary text-[10px] font-semibold tracking-wider uppercase">
                ENGINEERING IN MOTION.
              </span>
            </div>

            <hr className="border-border-subtle border-t" />

            {/* Stepper Checklist */}
            <div className="flex flex-col gap-4 text-xs" aria-label="System boot loaders status">
              {lines.map((line, index) => {
                const isActive = currentStep === index
                const isCompleted = currentStep > index

                return (
                  <div
                    key={line.label}
                    className={`flex items-center justify-between transition-all duration-300 ${
                      isActive
                        ? 'text-text-primary'
                        : isCompleted
                          ? 'text-text-secondary'
                          : 'text-text-muted/20'
                    }`}
                  >
                    <div>
                      <span>{line.label}</span>
                      <span className="text-text-muted/30 select-none">{line.dots}</span>
                    </div>
                    <span
                      className={
                        isCompleted
                          ? 'font-bold text-emerald-500'
                          : isActive
                            ? 'text-text-primary animate-pulse font-semibold'
                            : 'text-transparent'
                      }
                    >
                      {isCompleted && line.completedValue}
                      {isActive && line.activeValue}
                    </span>
                  </div>
                )
              })}
            </div>

            <hr className="border-border-subtle border-t" />

            {/* Welcome & CTA */}
            <div
              className={`flex flex-col gap-6 transition-all duration-700 ${
                progress >= 100 ? 'opacity-100' : 'pointer-events-none opacity-0'
              }`}
            >
              <div className="flex flex-col gap-1 text-center text-xs leading-normal font-semibold">
                <span className="text-text-primary">WELCOME DRIVER.</span>
                <span className="text-text-secondary text-[10px]">
                  LET'S ENGINEER WHAT COMES NEXT.
                </span>
              </div>

              <button
                onClick={onComplete}
                className="hover:border-text-primary/60 hover:bg-bg-surface/20 rounded-subtle flex w-full cursor-pointer items-center justify-center gap-1.5 border border-zinc-700 px-6 py-2.5 font-mono text-[10px] font-bold tracking-widest uppercase transition-all"
              >
                Enter Project Garage
                <span className="text-[8px] select-none">❯</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
