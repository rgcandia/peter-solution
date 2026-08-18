import { Router } from 'express'
import {
  listarOrdenes,
  obtenerOrden,
  crearOrden,
  actualizarOrden,
} from '../controllers/orden.controller.js'
import { verifyJwt, requireRol } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'
import { ordenSchema, ordenUpdateSchema } from '../schemas/orden.schema.js'

const router = Router()

router.get('/', verifyJwt, requireRol('admin', 'tecnico'), listarOrdenes)
router.get('/:id', verifyJwt, requireRol('admin', 'tecnico'), obtenerOrden)
router.post('/', verifyJwt, requireRol('admin', 'tecnico'), validate(ordenSchema), crearOrden)
router.patch('/:id', verifyJwt, requireRol('admin', 'tecnico'), validate(ordenUpdateSchema), actualizarOrden)

export default router
