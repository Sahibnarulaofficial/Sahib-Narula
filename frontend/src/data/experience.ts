export interface ExperienceEntry {
  organization: string
  program?: string
  role: string | null
  period: string | null
  responsibilities: string[]
}

// NOTE: Organization names are verified from user specification.
// Dates, job titles, and responsibilities have NOT been fabricated.
// User should update period and responsibilities fields with accurate information.
export const experiences: ExperienceEntry[] = [
  {
    organization: 'IBM SkillsBuild',
    program: 'AI Automation & Intelligent Solutions',
    role: 'Intern',
    period: null, // To be confirmed — no date found in source
    responsibilities: [],
  },
  {
    organization: 'Bleep',
    role: 'Intern',
    period: null, // To be confirmed — no date found in source
    responsibilities: [],
  },
]
