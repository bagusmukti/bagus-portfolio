import './styles/globals.css'
import { Navbar } from './components/Navbar'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { Skills } from './sections/Skills'
import { Projects } from './sections/Projects'
import { Experience } from './sections/Experience'
import { Contact } from './sections/Contact'
import { Footer } from './sections/Footer'
import { useCurtain } from './hooks/useCurtain'
import { useCursor } from './hooks/useCursor'

function App() {
  useCursor()
  const { navigate } = useCurtain()

  return (
    <>
      <Navbar onNav={navigate} />
      <main>
        <Hero onNav={navigate} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
