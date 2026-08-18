import { linkWhatsApp } from '../data/servicios'

export default function CtaWhatsApp() {
  return (
    <section className="section cta" id="contacto">
      <div className="container">
        <h2>¿Necesitás un servicio?</h2>
        <p>Escribinos por WhatsApp y coordinamos una visita.</p>
        <a
          className="btn btn-whatsapp"
          href={linkWhatsApp('Hola Peter Solution, quiero solicitar un servicio.')}
          target="_blank"
          rel="noopener noreferrer"
        >
          +54 9 11 3098-3806
        </a>
      </div>
    </section>
  )
}
