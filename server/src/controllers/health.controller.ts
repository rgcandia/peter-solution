import type { Request, Response } from 'express'

export function health(_req: Request, res: Response) {
  res.json({
    status: 'ok',
    service: 'peter-solution-api',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  })
}
