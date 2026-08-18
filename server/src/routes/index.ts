import { Router } from 'express'
import healthRoutes from './health.routes.js'
import authRoutes from './auth.routes.js'
import servicioRoutes from './servicio.routes.js'
import clienteRoutes from './cliente.routes.js'
import tecnicoRoutes from './tecnico.routes.js'
import ordenRoutes from './orden.routes.js'

const router = Router()

router.use('/health', healthRoutes)
router.use('/auth', authRoutes)
router.use('/servicios', servicioRoutes)
router.use('/clientes', clienteRoutes)
router.use('/tecnicos', tecnicoRoutes)
router.use('/ordenes', ordenRoutes)

export default router
