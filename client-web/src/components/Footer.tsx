import { Phone } from 'lucide-react'
import { SERVICIOS } from '../data/servicios'

function InstagramIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: '-2px', marginRight: 6 }}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-logo">Peter Solution</div>
            <p>
              Servicios a domicilio, reparaciones y mantenimiento integral del hogar.
            </p>
          </div>

          <div>
            <h4>Servicios</h4>
            {SERVICIOS.map((s) => (
              <p key={s.id}>{s.nombre}</p>
            ))}
          </div>

          <div>
            <h4>Contacto</h4>
            <p>
              <Phone size={14} style={{ verticalAlign: '-2px', marginRight: 6 }} />
              +54 9 11 3098-3806
            </p>
            <p>
              <a href="https://www.instagram.com/petermultiservicio" target="_blank" rel="noopener noreferrer">
                <InstagramIcon />
                @petermultiservicio
              </a>
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} Peter Solution Multiservicios. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
