import type { NextFunction, Request, Response } from 'express'
import type { ZodSchema } from 'zod'

// Middleware que valida el body con un schema de Zod.
// Si es válido, reemplaza req.body por los datos parseados.
export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.body)
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.issues[0]?.message ?? 'Datos inválidos' })
      return
    }
    req.body = parsed.data
    next()
  }
}
