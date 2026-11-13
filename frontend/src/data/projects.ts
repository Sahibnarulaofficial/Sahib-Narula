export interface Project {
  number: string
  name: string
  tagline: string
  status: string
  version: string
  description: string
  architecture: string[]
  technologies: string[]
  links: {
    github: string | null
    live: string | null
  }
}

// Content sourced exclusively from old portfolio — no information fabricated.
export const projects: Project[] = [
  {
    number: '01',
    name: 'APTLYST AI',
    tagline: 'AI Chatbot SaaS Platform',
    status: 'IN PRODUCTION',
    version: 'v1.0.0',
    description:
      'Aptlyst AI is an AI-powered customer interaction platform that enables businesses to build, customize, and deploy intelligent AI chatbots directly on their websites. Built with a focus on simplicity, scalability, and practical AI integration, it transforms how businesses handle customer interactions through automated, conversational experiences.\n\nFrom chatbot configuration and organization-based management to secure authentication and usage tracking, Aptlyst AI brings the essential infrastructure for deploying AI-powered customer support into one unified platform.',
    architecture: [
      'Multi-tenant organization management & role-based access control',
      'Embeddable website widget & streaming AI conversational runtime',
      'Secure authentication gateway with quota tracking & analytics telemetry',
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'LLMs', 'TailwindCSS'],
    links: {
      github: null,
      live: null,
    },
  },
  {
    number: '02',
    name: 'REVIVEOPS AI',
    tagline: 'Agentic Workflow Optimizer',
    status: 'BETA TESTING',
    version: 'v0.8.0-beta',
    description:
      'Actively scans server infrastructure logs, anticipates hardware limits, and resolves bottlenecks before they impact users — safeguarding uptime at the system level.',
    architecture: [
      'Structured log parsing adapters for Kubernetes system event files',
      'Multi-threaded Go daemon agents reporting local CPU/Memory cycles',
      'Prometheus metric collectors triggering Slack alerts on load anomalies',
    ],
    technologies: ['Python', 'Go', 'Kubernetes', 'Prometheus'],
    links: {
      github: "https://github.com/Sahibnarulaofficial/ReviveOps-AI",
      live: "https://revive-ops-ai.vercel.app/",
    },
  },
]
