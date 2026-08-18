import rateLimit from 'express-rate-limit'

// Límite global: 100 requests / minuto por IP
export const globalLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Demasiadas solicitudes. Intente más tarde.' },
})

// Límite estricto para endpoints sensibles (login): 10 requests / 5 min por IP
export const authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Demasiados intentos. Intente en unos minutos.' },
})
