import { useRef, useLayoutEffect, useState, type FormEvent } from 'react'
import { gsap } from '@/lib/gsap'
import { sendContactMessage } from '@/lib/api'
import resumeFile from '../../../../asset/documents/Resume.pdf'
type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef   = useRef<HTMLSpanElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subRef     = useRef<HTMLParagraphElement>(null)
  const formRef    = useRef<HTMLDivElement>(null)
  const formElRef  = useRef<HTMLFormElement>(null)

  const [status,       setStatus]       = useState<FormStatus>('idle')
  const [statusMsg,    setStatusMsg]    = useState('')

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })

      tl.from(labelRef.current,   { opacity: 0, y: 15, duration: 0.4 })
      tl.from(headingRef.current, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.7,
        ease: 'power3.out',
      }, '-=0.2')
      tl.from(subRef.current, { opacity: 0, y: 16, duration: 0.5 }, '-=0.2')
      tl.from(formRef.current, {
        opacity: 0, y: 30, duration: 0.6, ease: 'power2.out',
      }, '-=0.3')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === 'submitting') return // prevent duplicate submissions

    const form    = e.currentTarget
    const name    = (form.elements.namedItem('name')    as HTMLInputElement).value.trim()
    const email   = (form.elements.namedItem('email')   as HTMLInputElement).value.trim()
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value.trim()

    // Basic front-end validation
    if (!name || !email || !message) {
      setStatus('error')
      setStatusMsg('Please fill in all fields.')
      return
    }

    setStatus('submitting')
    setStatusMsg('')

    try {
      const result = await sendContactMessage({ name, email, message })
      if (result.success) {
        setStatus('success')
        setStatusMsg('Message sent! I\'ll get back to you soon.')
        form.reset()
      } else {
        setStatus('error')
        setStatusMsg(result.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setStatusMsg('Unable to reach the server. Please try again or email directly.')
    }
  }

  const inputBase =
    'w-full bg-brand-surface border border-brand-detail text-content-primary font-inter text-sm px-4 py-3 min-h-[48px] ' +
    'focus:outline-none focus:border-accent/70 transition-colors duration-200 ' +
    'placeholder:text-content-secondary/25'

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="border-t border-brand-detail"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 py-16 sm:py-24 md:py-32">
        <span
          ref={labelRef}
          className="font-mono text-[10px] text-accent tracking-[0.3em] uppercase block mb-4"
        >
          CONTACT / 04
        </span>
        <h2
          ref={headingRef}
          className="font-orbitron text-2xl sm:text-3xl md:text-5xl font-bold text-content-primary mb-4 sm:mb-5 tracking-tight"
          style={{ clipPath: 'inset(0 0 0% 0)' }}
        >
          LET'S BUILD SOMETHING
          <br />
          INTELLIGENT.
        </h2>
        <p
          ref={subRef}
          className="font-inter text-content-secondary mb-10 sm:mb-12 max-w-md text-[14px] sm:text-[15px] leading-relaxed"
        >
          Have an idea, project or problem worth solving? Let's talk.
        </p>

        {/* Two-column on lg+, single column on mobile */}
        <div ref={formRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left: Contact Form */}
          <div className="w-full">
            <form ref={formElRef} onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5" noValidate>
              {/* Name + Email row — single col on mobile, two cols on sm+ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-name"
                    className="font-mono text-[10px] text-content-secondary/50 tracking-[0.25em] uppercase"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    className={inputBase}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="contact-email"
                    className="font-mono text-[10px] text-content-secondary/50 tracking-[0.25em] uppercase"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="your@email.com"
                    className={inputBase}
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="contact-message"
                  className="font-mono text-[10px] text-content-secondary/50 tracking-[0.25em] uppercase"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Tell me about your project, idea, or problem..."
                  className={`${inputBase} resize-none min-h-[140px]`}
                  disabled={status === 'submitting'}
                />
              </div>

              {/* Inline status message */}
              {statusMsg && (
                <div
                  className={`flex items-start gap-2.5 px-4 py-3 border text-[12px] font-mono tracking-wider ${
                    status === 'success'
                      ? 'border-accent/40 text-accent bg-accent/5'
                      : 'border-content-secondary/20 text-content-secondary bg-brand-detail/20'
                  }`}
                  role="alert"
                  aria-live="polite"
                >
                  <span className="flex-shrink-0 mt-px">
                    {status === 'success' ? '✓' : '⚠'}
                  </span>
                  <span>{statusMsg}</span>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'submitting'}
                className={`group mt-1 inline-flex items-center justify-center gap-3 px-8 py-4 border font-inter text-[11px] font-medium tracking-[0.2em] uppercase transition-all duration-300 min-h-[52px] ${
                  status === 'submitting'
                    ? 'border-brand-detail text-content-secondary/50 cursor-not-allowed'
                    : 'border-accent text-content-primary hover:bg-accent focus-visible:bg-accent'
                }`}
              >
                {status === 'submitting' ? (
                  <span className="flex items-center gap-2">
                    <span className="inline-block w-3.5 h-3.5 border border-current border-t-transparent rounded-full animate-spin" />
                    SENDING...
                  </span>
                ) : status === 'success' ? (
                  <span className="flex items-center gap-2">
                    MESSAGE SENT
                    <span>✓</span>
                  </span>
                ) : (
                  <>
                    SEND MESSAGE
                    <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </>
                )}
              </button>

              <p className="font-mono text-[9px] text-content-secondary/30 tracking-wider">
                Or email directly: sahibnarulaofficial@gmail.com
              </p>
            </form>
          </div>

          {/* Right: Social Links — below form on mobile, beside on desktop */}
          <div className="flex flex-col gap-10 lg:pl-10 lg:border-l border-brand-detail">
            {/* Social Profiles */}
            <div className="flex flex-col gap-6">
              <span className="font-mono text-[10px] text-content-secondary/50 tracking-[0.25em] uppercase">
                Social Profiles
              </span>
              <div className="flex flex-col gap-4">
                {/* Email */}
                <a href="mailto:sahibnarulaofficial@gmail.com" className="group flex items-center gap-4 text-content-secondary hover:text-content-primary transition-colors duration-200">
                  <div className="w-12 h-12 border border-brand-detail rounded-full flex items-center justify-center flex-shrink-0 group-hover:border-accent group-hover:bg-accent/10 group-hover:text-accent transition-all duration-300">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </div>
                  <span className="font-inter text-sm tracking-wide">Email</span>
                </a>
                {/* LinkedIn */}
                <a href="https://www.linkedin.com/in/sahib-narula-787088357" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 text-content-secondary hover:text-content-primary transition-colors duration-200">
                  <div className="w-12 h-12 border border-brand-detail rounded-full flex items-center justify-center flex-shrink-0 group-hover:border-accent group-hover:bg-accent/10 group-hover:text-accent transition-all duration-300">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  </div>
                  <span className="font-inter text-sm tracking-wide">LinkedIn</span>
                </a>
                {/* GitHub */}
                <a href="https://github.com/Sahibnarulaofficial" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 text-content-secondary hover:text-content-primary transition-colors duration-200">
                  <div className="w-12 h-12 border border-brand-detail rounded-full flex items-center justify-center flex-shrink-0 group-hover:border-accent group-hover:bg-accent/10 group-hover:text-accent transition-all duration-300">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                  </div>
                  <span className="font-inter text-sm tracking-wide">GitHub</span>
                </a>
                {/* Instagram */}
                <a href="https://www.instagram.com/_sahib_singh_narula_/" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 text-content-secondary hover:text-content-primary transition-colors duration-200">
                  <div className="w-12 h-12 border border-brand-detail rounded-full flex items-center justify-center flex-shrink-0 group-hover:border-accent group-hover:bg-accent/10 group-hover:text-accent transition-all duration-300">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </div>
                  <span className="font-inter text-sm tracking-wide">Instagram</span>
                </a>
              </div>
            </div>
            
            {/* Documents */}
            <div className="flex flex-col gap-6 pt-4 border-t border-brand-detail/50 lg:border-none lg:pt-0">
              <span className="font-mono text-[10px] text-content-secondary/50 tracking-[0.25em] uppercase">
                Documents
              </span>
              <div className="flex flex-col gap-4">
                {/* Resume */}
                <a href={resumeFile} download="Resume.pdf" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 text-content-secondary hover:text-content-primary transition-colors duration-200">
                  <div className="w-12 h-12 border border-brand-detail rounded-full flex items-center justify-center flex-shrink-0 group-hover:border-accent group-hover:bg-accent/10 group-hover:text-accent transition-all duration-300">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  </div>
                  <span className="font-inter text-sm tracking-wide">Download Resume</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
