import type { Request, Response } from 'express'
import { prisma } from '../config/database.js'
import logger from '../lib/logger.js'

export async function listarClientes(_req: Request, res: Response) {
  try {
    const clientes = await prisma.cliente.findMany({ orderBy: { nombre: 'asc' } })
    res.json(clientes)
  } catch (err) {
    logger.error({ err }, 'Error listando clientes')
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export async function obtenerCliente(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)
    const cliente = await prisma.cliente.findUnique({ where: { id } })
    if (!cliente) {
      res.status(404).json({ error: 'Cliente no encontrado' })
      return
    }
    res.json(cliente)
  } catch (err) {
    logger.error({ err }, 'Error obteniendo cliente')
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export async function crearCliente(req: Request, res: Response) {
  try {
    const cliente = await prisma.cliente.create({ data: req.body })
    res.status(201).json(cliente)
  } catch (err) {
    logger.error({ err }, 'Error creando cliente')
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export async function actualizarCliente(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)
    const cliente = await prisma.cliente.update({ where: { id }, data: req.body })
    res.json(cliente)
  } catch (err) {
    logger.error({ err }, 'Error actualizando cliente')
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export async function eliminarCliente(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)
    await prisma.cliente.delete({ where: { id } })
    res.json({ ok: true })
  } catch (err) {
    logger.error({ err }, 'Error eliminando cliente')
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}
