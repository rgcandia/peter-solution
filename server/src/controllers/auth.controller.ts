import type { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { config } from '../config/index.js'
import { loginSchema } from '../schemas/auth.schema.js'
import logger from '../lib/logger.js'

// Login básico (placeholder). Se reemplazará por autenticación real
// (WhatsApp OTP / Firebase) en la fase del bot.
export function login(req: Request, res: Response) {
  const parsed = loginSchema.safeParse(req.body)
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.issues[0]?.message ?? 'Datos inválidos' })
    return
  }

  const { usuario, password } = parsed.data

  if (usuario !== config.ADMIN_USER || password !== config.ADMIN_PASSWORD) {
    logger.warn({ usuario }, 'Intento de login fallido')
    res.status(401).json({ error: 'Credenciales inválidas' })
    return
  }

  const token = jwt.sign(
    { sub: usuario, rol: 'admin', nombre: 'Administrador' },
    config.JWT_SECRET,
    { expiresIn: config.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] },
  )

  res.json({ token, usuario: { nombre: 'Administrador', rol: 'admin' } })
}

export function me(req: Request, res: Response) {
  res.json({ usuario: req.user })
}
