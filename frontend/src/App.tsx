import { useState } from 'react'
import { PrimaryLayout } from '@/layouts/PrimaryLayout'
import { GarageExperience } from '@/features/garage/components/GarageExperience'
import { DriverProfile } from '@/features/driver-profile/components/DriverProfile'
import { EngineeringExperience } from '@/features/engineering/components/EngineeringExperience'
import { RadioRoom } from '@/features/radio-room/components/RadioRoom'
import { CheckeredFlag } from '@/features/checkered-flag/components/CheckeredFlag'
import { StartupExperience } from '@/features/startup-sequence/components/StartupExperience'
import { HeroBackground } from '@/features/hero/components/HeroBackground'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Button } from '@/components/ui/Button'
import { DynamicFavicon } from '@/components/shared/DynamicFavicon'

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
      <DynamicFavicon />
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
        <PrimaryLayout
          heroSlot={
            <ScrollReveal direction="up">
              <section
                id="hero"
                className="relative flex min-h-[100vh] w-full flex-col justify-center select-none"
                aria-label="Welcome and introduction"
              >
                {/* Full-viewport F1 Telemetry Blueprint Background */}
                <HeroBackground />

                {/* Hero content — constrained width, floats over the immersive background */}
                <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-6 px-6">
                  <div className="flex flex-col gap-3">
                    <h1 className="font-orbitron text-text-primary text-4xl font-extrabold tracking-wider uppercase sm:text-6xl md:text-7xl">
                      Sahib Narula
                    </h1>
                    <span className="text-accent-red font-sans text-xs font-medium tracking-widest uppercase">
                      AI ENGINEER &amp; SYSTEMS BUILDER
                    </span>
                  </div>
                  <h2 className="text-text-primary max-w-2xl font-sans text-xl leading-tight font-semibold sm:text-2xl md:text-3xl">
                    Building software products, AI systems and immersive digital experiences.
                  </h2>
                  <p className="text-text-secondary max-w-xl font-sans text-sm leading-relaxed md:text-base">
                    I design and engineer production-grade platforms with a focus on latency,
                    security, and developer ergonomics. From modular AI agents to
                    container-orchestrated telemetry pipelines, Project Garage houses machines built
                    to push web capabilities forward.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        const el = document.getElementById('garage-title')
                        if (el) el.scrollIntoView({ behavior: 'smooth' })
                      }}
                      className="font-sans text-xs font-medium tracking-wider"
                    >
                      EXPLORE THE GARAGE ❯
                    </Button>
                  </div>
                </div>
              </section>
            </ScrollReveal>
          }
        >
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
