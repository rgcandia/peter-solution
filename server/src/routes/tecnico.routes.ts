import { Router } from 'express'
import {
  listarTecnicos,
  crearTecnico,
  actualizarTecnico,
  eliminarTecnico,
} from '../controllers/tecnico.controller.js'
import { verifyJwt, requireRol } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'
import { tecnicoSchema, tecnicoUpdateSchema } from '../schemas/tecnico.schema.js'

const router = Router()

router.get('/', verifyJwt, requireRol('admin', 'tecnico'), listarTecnicos)
router.post('/', verifyJwt, requireRol('admin'), validate(tecnicoSchema), crearTecnico)
router.patch('/:id', verifyJwt, requireRol('admin'), validate(tecnicoUpdateSchema), actualizarTecnico)
router.delete('/:id', verifyJwt, requireRol('admin'), eliminarTecnico)

export default router
