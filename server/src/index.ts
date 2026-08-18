import app from './app.js'
import { config } from './config/index.js'
import { connectDatabase, disconnectDatabase } from './config/database.js'
import logger from './lib/logger.js'

const server = app.listen(config.PORT, () => {
  logger.info({ port: config.PORT, env: config.NODE_ENV }, 'API Gateway iniciado')
})

async function shutdown(signal: string) {
  logger.info({ signal }, 'Cerrando servidor...')
  server.close(async () => {
    await disconnectDatabase()
    logger.info('Servidor cerrado correctamente')
    process.exit(0)
  })
  // Fuerza el cierre si algo se cuelga
  setTimeout(() => process.exit(1), 10000).unref()
}

// Conectar a la base de datos al arrancar (no bloquea si la db no está lista aún)
connectDatabase().catch((err) => {
  logger.error({ err: (err as Error).message }, 'No se pudo conectar a la base de datos')
})

process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))

process.on('unhandledRejection', (reason) => {
  logger.error({ reason }, 'unhandledRejection')
})

process.on('uncaughtException', (err) => {
  logger.error({ err: err.message }, 'uncaughtException')
  process.exit(1)
})
