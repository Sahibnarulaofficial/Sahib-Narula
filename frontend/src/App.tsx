import { useState } from 'react'
import { PrimaryLayout } from '@/layouts/PrimaryLayout'
import { GarageExperience } from '@/features/garage/components/GarageExperience'
import { DriverProfile } from '@/features/driver-profile/components/DriverProfile'
import { EngineeringExperience } from '@/features/engineering/components/EngineeringExperience'
import { RadioRoom } from '@/features/radio-room/components/RadioRoom'
import { CheckeredFlag } from '@/features/checkered-flag/components/CheckeredFlag'
import { StartupExperience } from '@/features/startup-sequence/components/StartupExperience'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Button } from '@/components/ui/Button'

function App() {
  const [isBooted, setIsBooted] = useState<boolean>(false)
  const [isStartupMounted, setIsStartupMounted] = useState<boolean>(true)

  const handleBootComplete = () => {
    setIsBooted(true)
    setTimeout(() => {
      setIsStartupMounted(false)
    }, 600)
  }

  return (
    <>
      {isStartupMounted && (
        <div
          className={`transition-opacity duration-500 ${isBooted ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
        >
          <StartupExperience onComplete={handleBootComplete} />
        </div>
      )}
      <div
        className={`transition-opacity duration-700 ${
          isBooted ? 'opacity-100' : 'pointer-events-none fixed opacity-0'
        }`}
      >
        <PrimaryLayout>
          {/* Landing Hero Section */}
          <ScrollReveal direction="up">
            <section
              id="hero"
              className="flex flex-col gap-6 py-8 select-none sm:py-12 lg:min-h-[calc(100vh-140px)] lg:justify-center lg:py-0"
              aria-label="Welcome and introduction"
            >
              <div className="flex flex-col gap-2 font-mono">
                <span className="text-text-primary text-[10px] font-bold tracking-widest uppercase">
                  PROJECT GARAGE
                </span>
                <span className="text-text-secondary text-[9px] tracking-wider uppercase">
                  BY SAHIB NARULA
                </span>
                <span className="text-status-success mt-1 text-[10px] font-semibold tracking-widest uppercase">
                  ENGINEERING IN MOTION.
                </span>
              </div>
              <h2 className="text-text-primary max-w-2xl font-sans text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl md:text-5xl">
                Building software products, AI systems and immersive digital experiences.
              </h2>
              <p className="text-text-secondary max-w-xl font-sans text-sm leading-relaxed md:text-base">
                I design and engineer production-grade platforms with a focus on latency, security,
                and developer ergonomics. From modular AI agents to container-orchestrated telemetry
                pipelines, Project Garage houses machines built to push web capabilities forward.
              </p>
              <div className="mt-4 flex flex-wrap gap-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    const el = document.getElementById('garage')
                    if (el) el.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="font-mono text-[10px] font-bold tracking-wider"
                >
                  EXPLORE THE GARAGE ❯
                </Button>
              </div>
            </section>
          </ScrollReveal>

          <GarageExperience />
          <DriverProfile />
          <EngineeringExperience />
          <RadioRoom />
          <CheckeredFlag />
        </PrimaryLayout>
      </div>
    </>
  )
}

export default App
