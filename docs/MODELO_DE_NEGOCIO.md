# Modelo de Negocio — Peter Solution Multiservicios

Documento que define para qué sirve la aplicación, qué problema resuelve y cómo monetiza. Es la base para que el producto escale.

---

## 1. Resumen ejecutivo

**Peter Solution** es una empresa de servicios a domicilio y mantenimiento integral del hogar (plomería, electricidad, gas, piletas, mantenimiento general). Esta aplicación digitaliza **todo** el ciclo del negocio: desde que el cliente pide un servicio por WhatsApp hasta que el técnico firma la conformidad en el domicilio.

---

## 2. El problema (cómo funciona hoy, sin la app)

| Dolor | Consecuencia |
|-------|--------------|
| Los pedidos llegan por WhatsApp/llamadas y se anotan **a mano** | Se pierden pedidos, no hay trazabilidad |
| El dueño (Peter) coordina técnicos **por teléfono** | Caos en la agenda, doble asignación |
| No hay **evidencia** del trabajo (fotos antes/después) | Reclamos de clientes sin respaldo |
| No hay **historial por propiedad** | Se pierden oportunidades de mantenimiento recurrente |
| No hay datos para decidir | No se sabe qué servicio es más rentable, qué técnico rinde más |

**Resultado:** el negocio depende 100% de la memoria y el tiempo del dueño. No escala.

---

## 3. La solución (el ecosistema)

Cinco piezas que cubren todo el ciclo:

```
CLIENTE pide servicio ──WhatsApp──► BOT ──► ORDEN DE TRABAJO
                                                │
                    ┌───────────────────────────┼───────────────────────┐
                    ▼                           ▼                       ▼
            DASHBOARD (Peter)            APP TÉCNICO            PORTAL CLIENTE
            Kanban + agenda             ruta + fotos + firma    estado + historial
```

| Módulo | Para quién | Para qué sirve |
|--------|-----------|----------------|
| **Bot WhatsApp** | Cliente | Pedir servicio sin fricción (fotos, ubicación, pre-clasificación) |
| **API Gateway + DB** | Todo el sistema | Un solo backend, datos centralizados |
| **Dashboard Admin** | Peter (dueño) | Kanban de órdenes, asignar técnicos, agenda, config del bot |
| **App Técnico (PWA)** | Técnicos | Ruta del día, check-in, fotos antes/después, firma del cliente |
| **Portal Cliente** | Cliente | Seguimiento del estado e historial por propiedad |

---

## 4. Modelo de ingresos

| Fuente | Descripción |
|--------|-------------|
| **Servicios a domicilio** | Mano de obra por visita (plomería, electricidad, gas, piletas, mantenimiento) |
| **Venta de repuestos/insumos** | E-commerce con opción de "compra + instalación" |
| **Mantenimiento recurrente** | Contratos de mantenimiento de piletas, gas, etc. (ingreso predecible mensual) |
| **Upsell desde historial** | La app recuerda cada propiedad y sugiere mantenimiento preventivo |

---

## 5. Por qué esta aplicación hace que el negocio escale

1. **Captación sin fricción** — el cliente ya está en WhatsApp; no necesita app nueva ni registrarse.
2. **Datos centralizados** — una sola base de datos, todos los módulos hablan con la misma API.
3. **Evidencia y trazabilidad** — cada orden tiene fotos, check-in, firma y estado. Menos conflictos, más confianza.
4. **Fidelización** — el historial por propiedad permite ofrecer mantenimiento recurrente (ingresos predecibles).
5. **Decisiones con datos** — el dueño ve métricas (órdenes por servicio, por técnico, por mes) en vez de intuir.
6. **Arquitectura escalable** — monorepo modular: se puede agregar un módulo nuevo (pagos, reportes, más técnicos) sin rehacer el resto.

---

## 6. Decisiones técnicas que respaldan la escala

| Decisión | Beneficio |
|----------|-----------|
| Monorepo (5 carpetas) | Un solo repo, módulos independientes |
| API Gateway única (`/api/v1`) | Todos los clientes consumen la misma API |
| PostgreSQL + Prisma | Migraciones versionadas, datos relacionales robustos |
| WhatsApp Cloud API (oficial) | Bot estable y sin riesgo de ban (vs whatsapp-web.js) |
| PWA para el técnico | Sin App Store, actualización automática |
| Seguridad desde el arranque | Helmet, CORS, rate limit, JWT+roles, Zod, Pino |

---

## 7. Hoja de ruta de monetización

1. **Fase actual**: API + bot → captar pedidos ordenadamente.
2. **Dashboard + app técnico** → operar con 2-5 técnicos sin caos.
3. **Portal cliente + e-commerce** → vender repuestos y fidelizar.
4. **Mantenimiento recurrente** → ingreso mensual predecible.
5. **Pagos online + reportes** → cobro digital y métricas financieras.

---

*Documento vivo — se actualiza a medida que el negocio y el producto evolucionan.*
