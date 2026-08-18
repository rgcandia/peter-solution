import { z } from 'zod'

export const servicioSchema = z.object({
  nombre: z.string().min(1, 'nombre es requerido'),
  categoria: z.enum(['plomeria', 'electricidad', 'gas', 'piletas', 'mantenimiento']).optional(),
  precioRef: z.number().nonnegative().optional(),
  activo: z.boolean().optional(),
})

export const servicioUpdateSchema = servicioSchema.partial()

export type ServicioInput = z.infer<typeof servicioSchema>
