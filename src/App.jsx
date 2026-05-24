import { BrowserRouter } from "react-router-dom"
import {About, Contact, Experience, Hero, Navbar, Tech, Works, StarsCanvas, Chatbot, Certifications} from './components'

const App = () => {

  return (
    
    <BrowserRouter>
    <div>Test</div>
    <div className="relative z-0 bg-black">
      <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
        <Navbar />
        <Hero /></div>
  
        <About />
        <Experience />
        <Tech />
        <Works />
        <Certifications />

        <div className="relative z-0">
          <Contact />
          <StarsCanvas /></div>

        </div>
      <Chatbot /></BrowserRouter>
  )
}

export default App
