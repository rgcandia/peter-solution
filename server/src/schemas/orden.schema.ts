import { z } from 'zod'

export const ordenSchema = z.object({
  clienteId: z.number().int().positive('clienteId es requerido'),
  servicioId: z.number().int().positive().optional(),
  descripcion: z.string().optional(),
  direccion: z.string().optional(),
  urgencia: z.enum(['normal', 'urgente']).optional(),
})

export const ordenUpdateSchema = z.object({
  estado: z.enum(['pendiente', 'asignada', 'en_proceso', 'terminada', 'cerrada']).optional(),
  urgencia: z.enum(['normal', 'urgente']).optional(),
  tecnicoId: z.number().int().positive().nullable().optional(),
  descripcion: z.string().optional(),
  direccion: z.string().optional(),
})

export type OrdenInput = z.infer<typeof ordenSchema>
export type OrdenUpdateInput = z.infer<typeof ordenUpdateSchema>
