import type { NextFunction, Request, Response } from 'express'
import logger from '../lib/logger.js'

export function notFound(_req: Request, res: Response) {
  res.status(404).json({ error: 'Recurso no encontrado' })
}

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  logger.error({ err: err.message }, 'Error no controlado')
  res.status(500).json({ error: 'Error interno del servidor' })
}
