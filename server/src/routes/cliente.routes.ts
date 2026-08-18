import { Router } from 'express'
import {
  listarClientes,
  obtenerCliente,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
} from '../controllers/cliente.controller.js'
import { verifyJwt, requireRol } from '../middleware/auth.js'
import { validate } from '../middleware/validate.js'
import { clienteSchema, clienteUpdateSchema } from '../schemas/cliente.schema.js'

const router = Router()

router.get('/', verifyJwt, requireRol('admin', 'tecnico'), listarClientes)
router.get('/:id', verifyJwt, requireRol('admin', 'tecnico'), obtenerCliente)
router.post('/', verifyJwt, requireRol('admin', 'tecnico'), validate(clienteSchema), crearCliente)
router.patch('/:id', verifyJwt, requireRol('admin'), validate(clienteUpdateSchema), actualizarCliente)
router.delete('/:id', verifyJwt, requireRol('admin'), eliminarCliente)

export default router
