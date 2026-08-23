import { useEffect } from 'react'
import { ScrollTrigger } from '@/lib/gsap'
import { ThemeProvider }  from '@/context/ThemeContext'
import { CustomCursor }   from '@/components/cursor/CustomCursor'
import { Navigation }     from '@/components/navigation/Navigation'
import { Hero }           from '@/components/hero/Hero'
import { About }          from '@/components/about/About'
import { TechStack }      from '@/components/tech-stack/TechStack'
import { Projects }       from '@/components/projects/Projects'
import { Experience }     from '@/components/experience/Experience'
import { Education }      from '@/components/education/Education'
import { Contact }        from '@/components/contact/Contact'
import { Footer }         from '@/components/footer/Footer'
import { AIChat }         from '@/components/AIChat/AIChat'

function AppContent() {
  // Refresh ScrollTrigger once fonts are loaded / after initial render
  useEffect(() => {
    const id = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 300)
    return () => clearTimeout(id)
  }, [])

  return (
    <>
      {/* Custom cursor — desktop only, self-disables on touch */}
      <CustomCursor />

      {/* Fixed navigation */}
      <Navigation />

      {/* Page content */}
      <main>
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>

      <Footer />
      
      {/* Floating AI Assistant */}
      <AIChat />
    </>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
