import { z } from 'zod'

export const tecnicoSchema = z.object({
  nombre: z.string().min(1, 'nombre es requerido'),
  telefono: z.string().optional(),
  especialidad: z.enum(['plomeria', 'electricidad', 'gas', 'piletas', 'mantenimiento']).optional(),
  activo: z.boolean().optional(),
})

export const tecnicoUpdateSchema = tecnicoSchema.partial()

export type TecnicoInput = z.infer<typeof tecnicoSchema>
