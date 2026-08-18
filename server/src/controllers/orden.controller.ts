import type { Request, Response } from 'express'
import { prisma } from '../config/database.js'
import logger from '../lib/logger.js'

const incluirRelaciones = {
  cliente: { select: { id: true, nombre: true, telefono: true } },
  tecnico: { select: { id: true, nombre: true } },
  servicio: { select: { id: true, nombre: true } },
}

export async function listarOrdenes(req: Request, res: Response) {
  try {
    const { estado, tecnicoId } = req.query
    const where: Record<string, unknown> = {}
    if (estado) where.estado = estado
    if (tecnicoId) where.tecnicoId = Number(tecnicoId)

    const ordenes = await prisma.ordenTrabajo.findMany({
      where,
      include: incluirRelaciones,
      orderBy: { creadoEn: 'desc' },
    })
    res.json(ordenes)
  } catch (err) {
    logger.error({ err }, 'Error listando órdenes')
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export async function obtenerOrden(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)
    const orden = await prisma.ordenTrabajo.findUnique({ where: { id }, include: incluirRelaciones })
    if (!orden) {
      res.status(404).json({ error: 'Orden no encontrada' })
      return
    }
    res.json(orden)
  } catch (err) {
    logger.error({ err }, 'Error obteniendo orden')
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export async function crearOrden(req: Request, res: Response) {
  try {
    const cliente = await prisma.cliente.findUnique({ where: { id: req.body.clienteId } })
    if (!cliente) {
      res.status(400).json({ error: 'El cliente no existe' })
      return
    }

    const orden = await prisma.ordenTrabajo.create({
      data: req.body,
      include: incluirRelaciones,
    })
    res.status(201).json(orden)
  } catch (err) {
    logger.error({ err }, 'Error creando orden')
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}

export async function actualizarOrden(req: Request, res: Response) {
  try {
    const id = Number(req.params.id)
    const data: Record<string, unknown> = { ...req.body }

    // Si se cierra la orden, registrar la fecha de cierre
    if (data.estado === 'cerrada') {
      data.cerradoEn = new Date()
    }

    const orden = await prisma.ordenTrabajo.update({
      where: { id },
      data,
      include: incluirRelaciones,
    })
    res.json(orden)
  } catch (err) {
    logger.error({ err }, 'Error actualizando orden')
    res.status(500).json({ error: 'Error interno del servidor' })
  }
}
