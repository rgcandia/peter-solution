import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Servicios from './components/Servicios'
import Trabajos from './components/Trabajos'
import CtaWhatsApp from './components/CtaWhatsApp'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Servicios />
        <Trabajos />
        <CtaWhatsApp />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
