export interface Servicio {
  id: string
  nombre: string
  descripcion: string
}

export const SERVICIOS: Servicio[] = [
  {
    id: 'plomeria',
    nombre: 'Plomería',
    descripcion: 'Destapaciones, pérdidas, instalaciones y reparaciones de cañerías.',
  },
  {
    id: 'electricidad',
    nombre: 'Electricidad',
    descripcion: 'Instalaciones, reparaciones, tableros y puesta a punto eléctrica.',
  },
  {
    id: 'gas',
    nombre: 'Gas',
    descripcion: 'Certificaciones, conexiones y detección de fugas de gas.',
  },
  {
    id: 'piletas',
    nombre: 'Piletas',
    descripcion: 'Mantenimiento, limpieza y puesta a punto de piletas.',
  },
  {
    id: 'mantenimiento',
    nombre: 'Mantenimiento general',
    descripcion: 'Pintura, cerrajería y arreglos varios del hogar.',
  },
]

export const WHATSAPP_NUMERO = '5491130983806'

export function linkWhatsApp(mensaje: string): string {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`
}
