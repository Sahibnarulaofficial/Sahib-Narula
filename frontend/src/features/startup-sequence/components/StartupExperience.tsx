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
  const [step, setStep] = useState<number>(0)

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

  useEffect(() => {
    if (step < lines.length) {
      const timer = setTimeout(() => {
        setStep((prev) => prev + 1)
      }, 700)
      return () => clearTimeout(timer)
    }
  }, [step, lines.length])

  return (
    <div
      className="text-text-primary fixed inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950 px-6 select-none"
      role="dialog"
      aria-modal="true"
      aria-label="System Startup Loading Overlay"
    >
      {/* Background ambient lighting effects */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_75%,rgba(239,68,68,0.06),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_35%,rgba(161,161,170,0.04),transparent_45%)]" />

      <div className="flex w-full max-w-sm flex-col gap-8 font-mono">
        {/* Header Title */}
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
            const isActive = step === index
            const isCompleted = step > index

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
                    isCompleted || isActive
                      ? 'text-status-success font-semibold'
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

        {/* Welcome Messages & Proceed Action */}
        <div
          className={`flex flex-col gap-6 transition-all duration-700 ${
            step === lines.length ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <div className="flex flex-col gap-1 text-center text-xs leading-normal font-semibold">
            <span className="text-text-primary">WELCOME DRIVER.</span>
            <span className="text-text-secondary text-[10px]">LET'S ENGINEER WHAT COMES NEXT.</span>
          </div>

          <button
            onClick={onComplete}
            className="hover:bg-bg-surface/20 hover:border-text-primary/60 rounded-subtle border-border-subtle flex w-full cursor-pointer items-center justify-center gap-1.5 border px-6 py-2.5 font-mono text-[10px] font-bold tracking-widest uppercase transition-all"
          >
            Enter Project Garage
            <span className="text-[8px] select-none">❯</span>
          </button>
        </div>
      </div>
    </div>
  )
}
