import { ShieldCheck, Zap, Flame, Waves, Hammer } from 'lucide-react'
import { linkWhatsApp } from '../data/servicios'

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="container hero-inner">
        <div>
          <span className="hero-badge">
            <ShieldCheck size={16} /> Servicios a domicilio
          </span>
          <h1>
            Soluciones para tu hogar, <span className="rojo">en una sola visita</span>
          </h1>
          <p>
            Plomería, electricidad, gas, piletas y mantenimiento general.
            Pedí tu servicio por WhatsApp y lo resolvemos.
          </p>
          <div className="hero-acciones">
            <a
              className="btn btn-whatsapp"
              href={linkWhatsApp('Hola Peter Solution, necesito un servicio.')}
              target="_blank"
              rel="noopener noreferrer"
            >
              Pedir por WhatsApp
            </a>
            <a className="btn btn-rojo" href="#servicios">
              Ver servicios
            </a>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-num">5</span>
              <span className="hero-stat-label">Especialidades</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-num">100%</span>
              <span className="hero-stat-label">A domicilio</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-num">24h</span>
              <span className="hero-stat-label">Respuesta rápida</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-card">
            <h3>Servicios destacados</h3>
            <div className="hero-card-item">
              <span className="hero-card-ic"><Zap size={22} /></span>
              <div>
                <strong>Electricidad</strong>
                <small>Instalaciones y reparaciones</small>
              </div>
            </div>
            <div className="hero-card-item">
              <span className="hero-card-ic"><Flame size={22} /></span>
              <div>
                <strong>Gas</strong>
                <small>Certificaciones y detección de fugas</small>
              </div>
            </div>
            <div className="hero-card-item">
              <span className="hero-card-ic"><Waves size={22} /></span>
              <div>
                <strong>Piletas</strong>
                <small>Mantenimiento y puesta a punto</small>
              </div>
            </div>
            <div className="hero-card-item">
              <span className="hero-card-ic"><Hammer size={22} /></span>
              <div>
                <strong>Mantenimiento general</strong>
                <small>Pintura y arreglos varios</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
