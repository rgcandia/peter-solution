import ComparacionSlider from './ComparacionSlider'
import { TRABAJOS, INSTAGRAM_URL } from '../data/trabajos'

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

export default function Trabajos() {
  return (
    <section className="section" id="trabajos" style={{ background: 'var(--gris-50)' }}>
      <div className="container">
        <h2 className="section-titulo">Trabajos recientes</h2>
        <p className="section-sub">
          Deslizá cada imagen para ver el antes y el después de nuestros trabajos.
        </p>

        <div className="trabajos-grid">
          {TRABAJOS.map((t) => (
            <article key={t.id} className="trabajo-card">
              <ComparacionSlider antes={t.antes} despues={t.despues} alt={t.titulo} />
              <div className="trabajo-meta">
                <span className="trabajo-categoria">{t.categoria}</span>
                <h3>{t.titulo}</h3>
              </div>
            </article>
          ))}
        </div>

        <div className="trabajos-cta">
          <a className="btn btn-rojo" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
            <InstagramIcon /> Ver más en Instagram
          </a>
        </div>
      </div>
    </section>
  )
}
