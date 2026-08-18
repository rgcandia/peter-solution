import type { Request, Response } from 'express'
import { prisma } from '../config/database.js'
import logger from '../lib/logger.js'

export async function listarServicios(req: Request, res: Response) {
  try {
    const { categoria } = req.query
    const where = categoria ? { categoria: categoria as never } : {}
    const servicios = await prisma.servicio.findMany({ where, orderBy: { nombre: 'asc' } })
    res.json(servicios)
  } catch (err) {
    logger.error({ err }, 'Error listando servicios')
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export async function obtenerServicio(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)
    const servicio = await prisma.servicio.findUnique({ where: { id } })
    if (!servicio) {
      res.status(404).json({ error: 'Servicio no encontrado' })
      return
    }
    res.json(servicio)
  } catch (err) {
    logger.error({ err }, 'Error obteniendo servicio')
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export async function crearServicio(req: Request, res: Response) {
  try {
    const servicio = await prisma.servicio.create({ data: req.body })
    res.status(201).json(servicio)
  } catch (err) {
    logger.error({ err }, 'Error creando servicio')
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export async function actualizarServicio(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)
    const servicio = await prisma.servicio.update({ where: { id }, data: req.body })
    res.json(servicio)
  } catch (err) {
    logger.error({ err }, 'Error actualizando servicio')
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export async function eliminarServicio(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)
    await prisma.servicio.delete({ where: { id } })
    res.json({ ok: true })
  } catch (err) {
    logger.error({ err }, 'Error eliminando servicio')
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}
