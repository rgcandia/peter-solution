import { z } from 'zod'

export const clienteSchema = z.object({
  nombre: z.string().min(1, 'nombre es requerido'),
  telefono: z.string().min(1, 'telefono es requerido'),
  direccion: z.string().optional(),
  notas: z.string().optional(),
})

export const clienteUpdateSchema = clienteSchema.partial()

export type ClienteInput = z.infer<typeof clienteSchema>
