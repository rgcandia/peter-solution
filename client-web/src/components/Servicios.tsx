import { Wrench, Zap, Flame, Waves, Hammer } from 'lucide-react'
import { SERVICIOS, linkWhatsApp } from '../data/servicios'

const ICONOS: Record<string, typeof Wrench> = {
  plomeria: Wrench,
  electricidad: Zap,
  gas: Flame,
  piletas: Waves,
  mantenimiento: Hammer,
}

export default function Servicios() {
  return (
    <section className="section" id="servicios">
      <div className="container">
        <h2 className="section-titulo">Nuestros servicios</h2>
        <p className="section-sub">
          Atención integral para tu hogar: desde una pérdida de agua hasta la puesta a punto de tu pileta.
        </p>

        <div className="servicios-grid">
          {SERVICIOS.map((servicio) => {
            const Icono = ICONOS[servicio.id] ?? Wrench
            return (
              <a
                key={servicio.id}
                className="servicio-card"
                href={linkWhatsApp(`Hola Peter Solution, necesito un servicio de ${servicio.nombre.toLowerCase()}.`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="servicio-card-ic">
                  <Icono size={26} />
                </span>
                <h3>{servicio.nombre}</h3>
                <p>{servicio.descripcion}</p>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
