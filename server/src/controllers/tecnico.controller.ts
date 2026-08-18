import type { Request, Response } from 'express'
import { prisma } from '../config/database.js'
import logger from '../lib/logger.js'

export async function listarTecnicos(_req: Request, res: Response) {
  try {
    const tecnicos = await prisma.tecnico.findMany({ orderBy: { nombre: 'asc' } })
    res.json(tecnicos)
  } catch (err) {
    logger.error({ err }, 'Error listando técnicos')
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export async function crearTecnico(req: Request, res: Response) {
  try {
    const tecnico = await prisma.tecnico.create({ data: req.body })
    res.status(201).json(tecnico)
  } catch (err) {
    logger.error({ err }, 'Error creando técnico')
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export async function actualizarTecnico(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)
    const tecnico = await prisma.tecnico.update({ where: { id }, data: req.body })
    res.json(tecnico)
  } catch (err) {
    logger.error({ err }, 'Error actualizando técnico')
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export async function eliminarTecnico(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)
    await prisma.tecnico.delete({ where: { id } })
    res.json({ ok: true })
  } catch (err) {
    logger.error({ err }, 'Error eliminando técnico')
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}
