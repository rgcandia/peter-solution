# TASK README — Peter Solution Multiservicios

Roadmap y backlog del sistema integral. Las fases se completan en orden secuencial.

---

## Registro de avances (diario)

### 2026-08-18 — Landing web (client-web)

- [x] Scaffolding de `client-web/` (React + TS + Vite + lucide-react)
- [x] Paleta de colores del **logo real** detectada: rojo `#D21404` + azul `#03224B` (se corrigió la paleta aproximada anterior)
- [x] Tipografía: Montserrat (títulos) + Inter (cuerpo)
- [x] Componentes: `Navbar`, `Hero` (con stats + cards de servicios), `Servicios` (5 cards), `CtaWhatsApp`, `Footer`, `WhatsAppFloat`
- [x] **Logo procesado**: se descargó el logo (JPEG 900×1600), se le quitó el fondo blanco (chroma key con sharp) → PNG transparente, y se generaron 2 versiones (`logo-nav.png`, `logo-footer.png`) con padding
- [x] **Logo integrado** en Navbar y Footer
- [x] **Sección "Trabajos recientes"** con slider de comparación arrastrable (antes/después) + placeholders + botón "Ver más en Instagram"
- [x] Enlaces de WhatsApp con mensaje precargado al `+54 9 11 3098-3806`
- [x] Build verificado, corriendo en dev (`:5176`)
- [ ] **Pendiente**: reemplazar placeholders por fotos reales, feed de Instagram dinámico, e-commerce

### 2026-08-18 — Scaffolding backend + DB + migración + repo

- [x] Repo creado en GitHub: `rgcandia/peter-solution`
- [x] Scaffolding del backend `server/` (Node 22 + Express + TS strict + ESM)
- [x] PostgreSQL levantado con Docker Compose (puerto host **5433**, para no chocar con otros proyectos)
- [x] Migración inicial de Prisma aplicada (`prisma migrate dev --name init`) — 6 tablas creadas
- [x] API Gateway corriendo en `:4000` con `GET /api/v1/health` respondiendo OK
- [x] Seguridad completa: Helmet, CORS, rate limit, JWT+roles, Zod, Pino, graceful shutdown
- [x] 6 tests (Vitest + supertest) pasando
- [x] Documentación: `MODELO_DE_NEGOCIO.md` creado
- [x] Endpoints CRUD de servicios/clientes/técnicos/órdenes implementados y probados

### Endpoints disponibles hasta ahora

| Método | Ruta | Acceso | Descripción |
|--------|------|--------|-------------|
| GET | `/api/v1/health` | público | Health check |
| POST | `/api/v1/auth/login` | público | Login (placeholder) |
| GET | `/api/v1/auth/me` | JWT | Usuario autenticado |
| GET | `/api/v1/servicios` | público | Listar servicios (catálogo) |
| GET | `/api/v1/servicios/:id` | público | Obtener servicio |
| POST | `/api/v1/servicios` | admin | Crear servicio |
| PATCH | `/api/v1/servicios/:id` | admin | Actualizar servicio |
| DELETE | `/api/v1/servicios/:id` | admin | Eliminar servicio |
| GET | `/api/v1/clientes` | admin/tecnico | Listar clientes |
| GET | `/api/v1/clientes/:id` | admin/tecnico | Obtener cliente |
| POST | `/api/v1/clientes` | admin/tecnico | Crear cliente |
| PATCH | `/api/v1/clientes/:id` | admin | Actualizar cliente |
| DELETE | `/api/v1/clientes/:id` | admin | Eliminar cliente |
| GET | `/api/v1/tecnicos` | admin/tecnico | Listar técnicos |
| POST | `/api/v1/tecnicos` | admin | Crear técnico |
| PATCH | `/api/v1/tecnicos/:id` | admin | Actualizar técnico |
| DELETE | `/api/v1/tecnicos/:id` | admin | Eliminar técnico |
| GET | `/api/v1/ordenes` | admin/tecnico | Listar órdenes (filtros estado/tecnico) |
| GET | `/api/v1/ordenes/:id` | admin/tecnico | Obtener orden (con relaciones) |
| POST | `/api/v1/ordenes` | admin/tecnico | Crear orden |
| PATCH | `/api/v1/ordenes/:id` | admin/tecnico | Actualizar estado/asignar técnico |

### Comandos para levantar el proyecto

```bash
cd server
cp .env.example .env          # ajustar JWT_SECRET
docker compose up -d          # PostgreSQL en :5433
npx prisma migrate dev        # aplicar migraciones
npm run dev                   # API en :4000
npm test                      # tests
```

---

## Estado general

- [x] **Fase 1** — Infraestructura y Documentación *(completa)*
- [ ] **Fase 2** — Backend & API Gateway + Webhook WhatsApp Bot *(en curso: API Gateway listo, bot pendiente)*
- [ ] **Fase 3** — Landing Web + Catálogo + Feed de Instagram
- [ ] **Fase 4** — Dashboard Web para Administración (PC)
- [ ] **Fase 5** — WebApp / PWA para Técnicos de Campo
- [ ] **Fase 6** — Portal del Cliente (Seguimiento e Historial)

---

## Fase 1: Infraestructura y Documentación *(Actual)*

- [x] Crear estructura de carpetas del monorepo
- [x] Inicializar repositorio Git local
- [x] `README.md` — visión general, contacto, colores, setup local
- [x] `docs/TASK_README.md` — este roadmap
- [x] `docs/ARQUITECTURA_Y_PROPUESTAS.md` — arquitectura técnica
- [ ] Elegir stack tecnológico definitivo (backend, frontends, base de datos)
- [ ] Configurar `.gitignore` y convenciones de commit
- [ ] Definir modelo de datos (tablas preliminares)

---

## Fase 2: Backend & API Gateway + Webhook WhatsApp Bot

- [x] Estructurar `server/` (Node.js + Express + TypeScript strict, ESM)
- [x] API Gateway central con rutas versionadas (`/api/v1/...`)
- [x] Conexión a base de datos (PostgreSQL) con **Prisma** + singleton
- [x] Tablas base: `clientes`, `ordenes_trabajo`, `tecnicos`, `servicios`, `productos_repuestos`, `historial_propiedad` (schema Prisma listo)
- [x] Seguridad: Helmet, CORS whitelist, rate limiting (global + auth), JWT con roles
- [x] Validación de entrada con **Zod**
- [x] Logging estructurado con **Pino**
- [x] Manejo de errores global + graceful shutdown
- [x] Tests base con **Vitest** + supertest (health, auth, 404)
- [x] Docker: Dockerfile multi-stage + docker-compose (PostgreSQL)
- [ ] Integración WhatsApp Business API (webhook) con el número `+54 9 11 3098-3806`
- [ ] Flujo del bot: recepción de mensaje → captura de datos → pre-clasificación del arreglo → creación de orden
- [ ] Captura de **fotos** del problema y **ubicación** del cliente vía WhatsApp
- [ ] Menú de servicios (plomería, electricidad, gas, piletas, mantenimiento)
- [ ] Confirmación de presupuesto y agendamiento básico
- [ ] Autenticación real (reemplazar login placeholder por OTP WhatsApp)

---

## Fase 3: Landing Web + Catálogo de Servicios/Productos + Feed de Instagram

- [ ] Landing page de presentación (`client-web/`) con identidad azul/rojo
- [ ] Catálogo de **servicios** (plomería, electricidad, gas, piletas, mantenimiento)
- [ ] Catálogo de **productos/repuestos** con instalación (e-commerce básico)
- [ ] Sección "Antes y Después" con trabajos reales
- [ ] Integración del **feed de Instagram** `@petermultiservicio` (widget/API) para mostrar publicaciones
- [ ] Formulario de contacto / solicitud de presupuesto
- [ ] Enlaces a WhatsApp con mensaje precargado

---

## Fase 4: Dashboard Web para Administración (PC)

- [ ] Login del dueño/admin en `client-dashboard/`
- [ ] Configuración de **respuestas del bot** (mensajes, menú, horarios)
- [ ] Tablero **Kanban** de órdenes de trabajo (Pendiente → En proceso → Terminada)
- [ ] Asignación de técnicos a órdenes
- [ ] Agenda / calendario de trabajos
- [ ] Gestión de clientes, técnicos, servicios y productos
- [ ] Métricas básicas (órdenes por estado, por técnico, por servicio)

---

## Fase 5: WebApp / PWA para Técnicos de Campo

- [ ] Login del técnico en `client-mobile/` (PWA instalable)
- [ ] **Hoja de ruta diaria** de trabajos asignados
- [ ] Integración con **mapas** (ubicación del cliente)
- [ ] **Check-in** al llegar al domicilio
- [ ] Carga de **evidencias**: fotos antes/después del trabajo
- [ ] **Firma del cliente** al finalizar (canvas táctil)
- [ ] Cambio de estado de la orden (en proceso / terminada)
- [ ] Modo offline básico (sincronización al reconectar)

---

## Fase 6: Portal del Cliente (Seguimiento de Reparaciones e Historial)

- [ ] Portal de clientes (login con WhatsApp/email)
- [ ] Seguimiento del estado de sus órdenes de trabajo
- [ ] Historial de reparaciones por propiedad/dirección
- [ ] Solicitud de nuevos servicios desde el portal
- [ ] Notificaciones de avance (WhatsApp/email)
- [ ] Calificación del servicio

---

## Pendientes globales / ideas

- [ ] Pagos online (Mercado Pago / transferencia)
- [ ] Recordatorios automáticos de mantenimiento (piletas, gas, etc.)
- [ ] Multi-idioma
- [ ] Reportes financieros mensuales

---

*Última actualización: 2026-08-18*
