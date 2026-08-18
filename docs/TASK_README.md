# TASK README — Peter Solution Multiservicios

Roadmap y backlog del sistema integral. Las fases se completan en orden secuencial.

---

## Estado general

- [x] **Fase 1** — Infraestructura y Documentación *(en curso)*
- [ ] **Fase 2** — Backend & API Gateway + Webhook WhatsApp Bot
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

- [ ] Estructurar `server/` (Node.js + Express, arquitectura modular)
- [ ] API Gateway central con rutas versionadas (`/api/v1/...`)
- [ ] Conexión a base de datos (PostgreSQL) con ORM
- [ ] Tablas base: `clientes`, `ordenes_trabajo`, `tecnicos`, `servicios`, `productos_repuestos`, `historial_propiedad`
- [ ] Integración WhatsApp Business API (webhook) con el número `+54 9 11 3098-3806`
- [ ] Flujo del bot: recepción de mensaje → captura de datos → pre-clasificación del arreglo → creación de orden
- [ ] Captura de **fotos** del problema y **ubicación** del cliente vía WhatsApp
- [ ] Menú de servicios (plomería, electricidad, gas, piletas, mantenimiento)
- [ ] Confirmación de presupuesto y agendamiento básico
- [ ] Autenticación y autorización (JWT) para los clientes del ecosistema

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
