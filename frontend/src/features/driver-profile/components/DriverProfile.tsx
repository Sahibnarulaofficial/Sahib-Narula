import React from 'react'
import { ProfileCard } from './ProfileCard'
import { StatsCard } from './StatsCard'
import { PerformanceCard } from './PerformanceCard'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ScrollReveal } from '@/components/shared/ScrollReveal'

export const DriverProfile: React.FC = () => {
  return (
    <section
      id="driver-profile"
      className="flex flex-col gap-4 lg:min-h-[calc(100vh-140px)] lg:justify-center"
      aria-labelledby="driver-profile-heading"
    >
      <ScrollReveal direction="up">
        <SectionHeader
          id="driver-profile-heading"
          title="DRIVER EXPERIENCE"
          subtitle="Understanding the engineer, the craft, and the current missions"
        />
      </ScrollReveal>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <ScrollReveal direction="left" delay={0}>
          <ProfileCard />
        </ScrollReveal>
        <ScrollReveal direction="left" delay={150}>
          <StatsCard />
        </ScrollReveal>
        <ScrollReveal direction="left" delay={300}>
          <PerformanceCard />
        </ScrollReveal>
      </div>
    </section>
  )
}
