import { linkWhatsApp } from '../data/servicios'

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a href="#inicio" className="navbar-logo">
          <img src="/logo-nav.png" alt="Peter Solution" className="navbar-logo-img" />
          <span>
            Peter <span className="rojo">Solution</span>
          </span>
        </a>

        <nav>
          <ul className="navbar-links">
            <li><a href="#servicios">Servicios</a></li>
            <li><a href="#trabajos">Trabajos</a></li>
            <li><a href="#contacto">Contacto</a></li>
          </ul>
        </nav>

        <a
          className="btn btn-rojo"
          href={linkWhatsApp('Hola Peter Solution, necesito un servicio.')}
          target="_blank"
          rel="noopener noreferrer"
        >
          Pedir servicio
        </a>
      </div>
    </header>
  )
}
