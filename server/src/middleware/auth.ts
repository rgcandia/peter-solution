import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { config } from '../config/index.js'
import type { Rol } from '@prisma/client'

export interface TokenPayload {
  sub: string
  rol: Rol
  nombre: string
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: TokenPayload
    }
  }
}

export function verifyJwt(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Token requerido' })
    return
  }

  const token = header.split(' ')[1]
  if (!token) {
    res.status(401).json({ error: 'Token requerido' })
    return
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET, { algorithms: ['HS256'] }) as unknown as TokenPayload
    req.user = decoded
    next()
  } catch {
    res.status(401).json({ error: 'Token inválido o expirado' })
  }
}

// Middleware que exige uno o más roles
export function requireRol(...roles: Rol[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({ error: 'No autenticado' })
      return
    }
    if (!roles.includes(req.user.rol)) {
      res.status(403).json({ error: 'Acceso denegado' })
      return
    }
    next()
  }
}
