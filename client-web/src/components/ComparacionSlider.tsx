import { useRef, useState } from 'react'

interface ComparacionSliderProps {
  antes: string
  despues: string
  alt: string
}

export default function ComparacionSlider({ antes, despues, alt }: ComparacionSliderProps) {
  const [pos, setPos] = useState(50)
  const contRef = useRef<HTMLDivElement>(null)
  const arrastrando = useRef(false)

  function calcularPos(clientX: number) {
    const rect = contRef.current?.getBoundingClientRect()
    if (!rect) return
    const p = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.min(100, Math.max(0, p)))
  }

  function onDown(clientX: number) {
    arrastrando.current = true
    calcularPos(clientX)
  }

  function onMove(clientX: number) {
    if (arrastrando.current) calcularPos(clientX)
  }

  function onUp() {
    arrastrando.current = false
  }

  return (
    <div
      ref={contRef}
      className="comparacion"
      onMouseDown={(e) => onDown(e.clientX)}
      onMouseMove={(e) => onMove(e.clientX)}
      onMouseUp={onUp}
      onMouseLeave={onUp}
      onTouchStart={(e) => onDown(e.touches[0]!.clientX)}
      onTouchMove={(e) => onMove(e.touches[0]!.clientX)}
      onTouchEnd={onUp}
    >
      <img src={despues} alt={`${alt} - después`} className="comparacion-img" draggable={false} />
      <div className="comparacion-antes" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={antes} alt={`${alt} - antes`} className="comparacion-img" draggable={false} />
      </div>
      <span className="comparacion-etiqueta comparacion-etiqueta-antes">Antes</span>
      <span className="comparacion-etiqueta comparacion-etiqueta-despues">Después</span>
      <div className="comparacion-handle" style={{ left: `${pos}%` }}>
        <span className="comparacion-handle-flecha">‹›</span>
      </div>
    </div>
  )
}
