export interface TechItem {
  name: string
  category: string
}

// Technologies verified from actual project work and biography in old portfolio.
export const techStack: TechItem[] = [
  { name: 'React',       category: 'Frontend'   },
  { name: 'TypeScript',  category: 'Language'   },
  { name: 'JavaScript',  category: 'Language'   },
  { name: 'Node.js',     category: 'Backend'    },
  { name: 'Express',     category: 'Backend'    },
  { name: 'Python',      category: 'Language'   },
  { name: 'Go',          category: 'Language'   },
  { name: 'WebRTC',      category: 'Protocol'   },
  { name: 'LangChain',   category: 'AI'         },
  { name: 'LLMs',        category: 'AI'         },
  { name: 'Kubernetes',  category: 'Infra'      },
  { name: 'Prometheus',  category: 'Monitoring' },
  { name: 'Docker',      category: 'Infra'      },
  { name: 'Git',         category: 'Tooling'    },
  { name: 'PostgreSQL',  category: 'Database'   },
  { name: 'MongoDB',     category: 'Database'   },
]
