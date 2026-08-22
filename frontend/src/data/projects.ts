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
    tagline: 'AI Meeting Copilot Platform',
    status: 'IN PRODUCTION',
    version: 'v1.0.0',
    description:
      'Transforms raw spoken discussions into structured, action-oriented engineering specifications — removing manual summarization delays and alignment friction across engineering teams.',
    architecture: [
      'Real-time audio processing pipeline via WebRTC protocols',
      'Structured spec extraction engine powered by OpenAI JSON schemas',
      'Autonomous task generation workers mapping directly to Jira APIs',
    ],
    technologies: ['React', 'TypeScript', 'Node.js', 'LLMs', 'WebRTC'],
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
      github: null,
      live: null,
    },
  },
]
