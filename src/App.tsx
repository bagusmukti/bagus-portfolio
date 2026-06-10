import './styles/globals.css'
import { Navbar } from './components/Navbar'
import { ScrollToTop } from './components/ScrollToTop'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Skills } from './sections/Skills'
import { Projects } from './sections/Projects'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'
import { useCurtain } from './hooks/useCurtain'
import { useCursor } from './hooks/useCursor'
import { useTheme } from './hooks/useTheme'

function App() {
  useCursor()
  const { navigate } = useCurtain()
  const { theme, toggle } = useTheme()

  return (
    <>
      <Navbar onNav={navigate} />
      <main>
        <Hero onNav={navigate} />
        <About theme={theme} onToggleTheme={toggle} />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  )
}

export default App
