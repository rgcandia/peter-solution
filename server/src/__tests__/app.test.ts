import { describe, it, expect } from 'vitest'
import request from 'supertest'
import app from '../app.js'

describe('API Gateway', () => {
  it('GET /api/v1/health responde ok', async () => {
    const res = await request(app).get('/api/v1/health')
    expect(res.status).toBe(200)
    expect(res.body.status).toBe('ok')
    expect(res.body.service).toBe('peter-solution-api')
  })

  it('GET /api/v1/auth/me sin token devuelve 401', async () => {
    const res = await request(app).get('/api/v1/auth/me')
    expect(res.status).toBe(401)
  })

  it('POST /api/v1/auth/login con credenciales válidas devuelve token', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ usuario: 'admin', password: 'admin123' })

    expect(res.status).toBe(200)
    expect(res.body.token).toBeTruthy()
  })

  it('POST /api/v1/auth/login con credenciales inválidas devuelve 401', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({ usuario: 'admin', password: 'incorrecta' })

    expect(res.status).toBe(401)
  })

  it('GET /api/v1/auth/me con token válido devuelve el usuario', async () => {
    const login = await request(app)
      .post('/api/v1/auth/login')
      .send({ usuario: 'admin', password: 'admin123' })

    const res = await request(app)
      .get('/api/v1/auth/me')
      .set('Authorization', `Bearer ${login.body.token}`)

    expect(res.status).toBe(200)
    expect(res.body.usuario.rol).toBe('admin')
  })

  it('ruta inexistente devuelve 404', async () => {
    const res = await request(app).get('/api/v1/no-existe')
    expect(res.status).toBe(404)
  })

  it('POST /api/v1/servicios sin token devuelve 401', async () => {
    const res = await request(app).post('/api/v1/servicios').send({ nombre: 'Plomería' })
    expect(res.status).toBe(401)
  })

  it('POST /api/v1/servicios con body inválido devuelve 400', async () => {
    const login = await request(app)
      .post('/api/v1/auth/login')
      .send({ usuario: 'admin', password: 'admin123' })

    const res = await request(app)
      .post('/api/v1/servicios')
      .set('Authorization', `Bearer ${login.body.token}`)
      .send({})

    expect(res.status).toBe(400)
  })

  it('GET /api/v1/clientes sin token devuelve 401', async () => {
    const res = await request(app).get('/api/v1/clientes')
    expect(res.status).toBe(401)
  })

  it('GET /api/v1/ordenes sin token devuelve 401', async () => {
    const res = await request(app).get('/api/v1/ordenes')
    expect(res.status).toBe(401)
  })
})
