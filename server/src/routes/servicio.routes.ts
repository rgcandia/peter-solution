import { Router } from 'express'
import {
  listarServicios,
  obtenerServicio,
  crearServicio,
  actualizarServicio,
  eliminarServicio,
} from '../controllers/servicio.controller.js'
import { verifyJwt, requireRol } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'
import { servicioSchema, servicioUpdateSchema } from '../schemas/servicio.schema.js'

const router = Router()

// Catálogo público (para la landing web)
router.get('/', listarServicios)
router.get('/:id', obtenerServicio)

// Gestión (solo admin)
router.post('/', verifyJwt, requireRol('admin'), validate(servicioSchema), crearServicio)
router.patch('/:id', verifyJwt, requireRol('admin'), validate(servicioUpdateSchema), actualizarServicio)
router.delete('/:id', verifyJwt, requireRol('admin'), eliminarServicio)

export default router
