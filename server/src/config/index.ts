import 'dotenv/config'
import { z } from 'zod'
import logger from '../lib/logger.js'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL es requerida'),
  JWT_SECRET: z.string().min(16, 'JWT_SECRET debe tener al menos 16 caracteres'),
  JWT_EXPIRES_IN: z.string().default('8h'),
  CORS_ORIGINS: z.string().default('http://localhost:5173'),
  LOG_LEVEL: z.string().default('info'),
  ADMIN_USER: z.string().default('admin'),
  ADMIN_PASSWORD: z.string().default('admin123'),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  logger.fatal({ issues: parsed.error.issues }, 'Variables de entorno inválidas')
  process.exit(1)
}

export const config = parsed.data

export const corsOrigins = config.CORS_ORIGINS.split(',').map((o) => o.trim()).filter(Boolean)
