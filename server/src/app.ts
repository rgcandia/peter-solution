import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { corsOrigins } from './config/index.js'
import { globalLimiter } from './middleware/rateLimit.js'
import { notFound, errorHandler } from './middleware/errorHandler.js'
import routes from './routes/index.js'

const app = express()

// Seguridad
app.set('trust proxy', 1)
app.use(helmet())
app.use(cors({ origin: corsOrigins, credentials: true }))
app.use(globalLimiter)

// Parsing
app.use(express.json({ limit: '1mb' }))

// Rutas versionadas
app.use('/api/v1', routes)

// Manejo de errores
app.use(notFound)
app.use(errorHandler)

export default app
