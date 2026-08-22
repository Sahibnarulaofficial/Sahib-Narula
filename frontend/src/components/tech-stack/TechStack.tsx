import { useRef, useLayoutEffect } from 'react'
import { gsap } from '@/lib/gsap'

/* ── Data: grouped by category ────────────────────────────── */
const TECH_GROUPS = [
  {
    category: 'AI & Automation',
    techs: ['LLM Applications', 'AI Agents', 'LangChain', 'AI APIs', 'Workflow Automation'],
  },
  {
    category: 'Development',
    techs: ['Python', 'TypeScript', 'JavaScript', 'React', 'Node.js', 'FastAPI', 'Electron'],
  },
  {
    category: 'Engineering',
    techs: ['REST APIs', 'Git/GitHub', 'Linux/WSL', 'Vite', 'Tailwind CSS'],
  },
  {
    category: 'Deployment',
    techs: ['Vercel', 'Render', 'Docker'],
  },
] as const

/* ── Hover handlers (CSS-only properties — no GSAP conflict) ─ */
function onPillEnter(e: React.MouseEvent<HTMLSpanElement>) {
  const el = e.currentTarget
  el.style.backgroundColor = '#E10600'
  el.style.color            = '#FFFFFF'
  el.style.borderColor      = '#E10600'
  el.style.boxShadow        = '0 6px 22px rgba(225, 6, 0, 0.32)'
}

function onPillLeave(e: React.MouseEvent<HTMLSpanElement>) {
  const el = e.currentTarget
  el.style.backgroundColor = ''
  el.style.color            = ''
  el.style.borderColor      = ''
  el.style.boxShadow        = ''
}

/* ── Component ────────────────────────────────────────────── */
export function TechStack() {
  const sectionRef      = useRef<HTMLElement>(null)
  const labelRef        = useRef<HTMLSpanElement>(null)
  const headingRef      = useRef<HTMLHeadingElement>(null)
  const pillsContainerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* ── ScrollTrigger entrance ── */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      })

      tl.from(labelRef.current, {
        opacity: 0, y: 15, duration: 0.4, ease: 'power2.out',
      })
      tl.from(headingRef.current, {
        opacity: 0, y: 20, duration: 0.5, ease: 'power2.out',
      }, '-=0.2')

      const pills = pillsContainerRef.current?.querySelectorAll('.tech-pill')

      if (pills && pills.length > 0) {
        // ── Entrance: scale 0.5 → 1, opacity 0 → 1, y 20 → 0
        tl.from(Array.from(pills), {
          scale:   0.5,
          opacity: 0,
          y:       20,
          stagger: 0.1,
          duration: 0.55,
          ease:    'back.out(1.7)',
        }, '-=0.15')

        // ── After entrance completes: start per-pill floating
        tl.call(() => {
          Array.from(pills).forEach((pill) => {
            // Random amplitude (upward), duration, and start delay per pill
            const amplitude = gsap.utils.random(2, 4.5)
            const dur       = gsap.utils.random(2.2, 3.8)
            const delay     = gsap.utils.random(0, 2.5)

            gsap.to(pill, {
              y:        -amplitude,   // gentle upward float
              duration: dur,
              yoyo:     true,
              repeat:   -1,
              ease:     'sine.inOut',
              delay,
            })
          })
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="tech-stack"
      className="border-t border-brand-detail"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 py-16 sm:py-20 md:py-28">
        {/* Eyebrow */}
        <span
          ref={labelRef}
          className="font-mono text-[10px] text-accent tracking-[0.3em] uppercase block mb-4"
        >
          CAPABILITIES
        </span>

        {/* Heading */}
        <h2
          ref={headingRef}
          className="font-orbitron text-2xl sm:text-2xl md:text-3xl font-bold text-content-primary mb-10 sm:mb-14 tracking-tight"
        >
          TECHNICAL EXPERTISE
        </h2>

        {/* Grouped pill grid */}
        <div ref={pillsContainerRef} className="flex flex-col gap-10">
          {TECH_GROUPS.map((group) => (
            <div key={group.category} className="flex flex-col gap-4">
              {/* Category label */}
              <div className="flex items-center gap-3">
                <div className="w-1 h-1 rounded-full bg-accent/60" />
                <span className="font-mono text-[10px] text-content-secondary/40 tracking-[0.25em] uppercase">
                  {group.category}
                </span>
              </div>

              {/* Pills */}
              <div className="flex flex-wrap gap-3">
                {group.techs.map((tech) => (
                  <span
                    key={tech}
                    className="tech-pill inline-flex items-center px-4 py-2.5 border border-brand-detail rounded-full text-content-secondary font-mono text-[11px] tracking-wider cursor-default"
                    style={{
                      // Smooth transition for hover — only non-transform props
                      // so GSAP transform (y float) is never interrupted
                      transition:
                        'background-color 0.22s ease, color 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease',
                    }}
                    onMouseEnter={onPillEnter}
                    onMouseLeave={onPillLeave}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
