export interface Trabajo {
  id: string
  titulo: string
  categoria: string
  antes: string
  despues: string
}

export const TRABAJOS: Trabajo[] = [
  {
    id: 'plomeria-1',
    titulo: 'Reparación de cañería',
    categoria: 'Plomería',
    antes: '/trabajos/antes-1.svg',
    despues: '/trabajos/despues-1.svg',
  },
  {
    id: 'electricidad-1',
    titulo: 'Renovación de tablero',
    categoria: 'Electricidad',
    antes: '/trabajos/antes-2.svg',
    despues: '/trabajos/despues-2.svg',
  },
  {
    id: 'piletas-1',
    titulo: 'Puesta a punto de pileta',
    categoria: 'Piletas',
    antes: '/trabajos/antes-3.svg',
    despues: '/trabajos/despues-3.svg',
  },
]

export const INSTAGRAM_URL = 'https://www.instagram.com/petermultiservicio'
