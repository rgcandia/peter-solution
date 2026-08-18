# Arquitectura y Propuestas — Peter Solution Multiservicios

Documento técnico de arquitectura del ecosistema digital. Detalla cada módulo, sus flujos y el modelo de datos preliminar.

---

## Índice

1. [Visión de arquitectura](#visión-de-arquitectura)
2. [Módulo Bot de WhatsApp](#módulo-bot-de-whatsapp)
3. [Módulo Web & E-Commerce](#módulo-web--e-commerce)
4. [Módulo Dashboard Admin (PC)](#módulo-dashboard-admin-pc)
5. [Módulo App Técnico (Móvil)](#módulo-app-técnico-móvil)
6. [API Gateway & Base de Datos](#api-gateway--base-de-datos)

---

## Visión de arquitectura

Monorepo cliente-servidor con una API Gateway central y cuatro clientes:

```
WhatsApp (cliente) ──webhook──┐
                               ▼
                    ┌─────────────────────┐
                    │   API Gateway       │
                    │  (REST /api/v1)     │
                    │  + Bot WhatsApp     │
                    └─────────┬───────────┘
                              │
                    ┌─────────▼─────────┐
                    │  Base de Datos    │
                    │  (PostgreSQL)     │
                    └─────────┬─────────┘
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
       client-web       client-dashboard  client-mobile
       (Landing +        (Admin PC)        (PWA Técnico)
        E-commerce)
```

**Principios:**
- Un solo backend (`server/`) expone la API y el webhook del bot.
- Todos los clientes consumen la misma API Gateway.
- Autenticación JWT con roles: `cliente`, `tecnico`, `admin`.
- Base de datos relacional (PostgreSQL) con ORM.

---

## Módulo Bot de WhatsApp

El bot es la puerta de entrada principal: el cliente escribe por WhatsApp y el sistema pre-clasifica el arreglo antes de crear la orden.

### Flujo de interacción

```
Cliente escribe al número
   ↓
Saludo + menú de servicios (plomería, electricidad, gas, piletas, mantenimiento)
   ↓
Cliente elige el servicio
   ↓
Describe el problema (texto)
   ↓
Bot pide FOTOS del problema (1..N)
   ↓
Bot pide UBICACIÓN (o dirección manual)
   ↓
Pre-clasificación del arreglo:
   • Tipo de servicio
   • Urgencia (normal / urgente)
   • Propiedad (casa / departamento / pileta, etc.)
   ↓
Resumen al cliente + confirmación
   ↓
Creación de ORDEN DE TRABAJO (estado: pendiente)
   ↓
Notificación al dashboard admin
```

### Captura de datos clave

| Dato | Cómo se captura |
|------|-----------------|
| Fotos del problema | Mensajes multimedia de WhatsApp (imagen) |
| Ubicación | Ubicación compartida de WhatsApp o dirección por texto |
| Datos del cliente | Registro automático (nombre + número) o datos adicionales |
| Urgencia | Pregunta directa / detección por palabras clave |

### Pre-clasificación de arreglos

Se asigna automáticamente una categoría y un nivel de urgencia inicial, editable luego desde el dashboard:

- **Categorías:** plomería, electricidad, gas, piletas, mantenimiento.
- **Urgencia:** `normal` (agendable) o `urgente` (ej. pérdida de gas, corte de luz total).

---

## Módulo Web & E-Commerce

Landing page pública + catálogo con opción de compra de repuestos con instalación.

### Catálogo de servicios

- Plomería (destapaciones, pérdidas, instalaciones)
- Electricidad (instalaciones, reparaciones, tableros)
- Gas (certificaciones, conexiones, detección de fugas)
- Piletas (mantenimiento, limpieza, puesta a punto)
- Mantenimiento general (pintura, cerrajería, arreglos varios)

Cada servicio tiene: descripción, precio de referencia, fotos y botón "Pedir presupuesto" (abre WhatsApp o formulario).

### Venta de repuestos/insumos con instalación

- Catálogo de productos (repuestos, insumos) con precio y stock.
- Opción "comprar con instalación" (se genera una orden que incluye el producto + la visita del técnico).
- Checkout básico (fase futura: pasarela de pago).

### Integración de Instagram

Mostrar el feed de `@petermultiservicio` con los trabajos reales de "Antes y Después".

| Opción | Descripción |
|--------|-------------|
| **A. Widget embebido** | Plugin/iframe oficial de Instagram (rápido, sin backend) |
| **B. Instagram Graph API** | Feed programático con token (requiere app de Meta + permisos) |
| **C. Curaduría manual** | Galería curada por el admin desde el dashboard (sin dependencia de API) |

Recomendación inicial: **A (widget)** para salir rápido, migrando a **B/C** cuando se necesite control del diseño o evitar dependencias de terceros.

---

## Módulo Dashboard Admin (PC)

Panel del dueño para administrar todo el negocio.

### Configuración de respuestas del bot

- Editar textos del bot (saludo, menú, confirmaciones, despedida).
- Configurar horarios de atención y mensajes fuera de horario.
- Definir servicios disponibles y sus categorías.

### Tablero Kanban de órdenes de trabajo

Columnas de estado:

```
Pendiente → Asignada → En proceso → Terminada → Cerrada
```

- Drag & drop para mover órdenes entre columnas.
- Cada tarjeta muestra: cliente, servicio, urgencia, técnico asignado, fotos.
- Filtros por técnico, servicio, fecha y urgencia.

### Asignación de técnicos y agenda

- Lista de técnicos con disponibilidad.
- Asignar/reasignar técnicos a órdenes.
- Vista de agenda (calendario) con los trabajos del día.
- Notificación al técnico asignado (vía app/PWA).

---

## Módulo App Técnico (Móvil)

**Tecnología: PWA (Progressive Web App) — app web instalable**, construida con **React + TypeScript + Vite** + `vite-plugin-pwa`. No es una app nativa (React Native/Expo): se instala desde el navegador en el home del celular, sin publicar en App Store/Play Store, con actualizaciones automáticas.

### Por qué PWA y no app nativa

| | PWA (React + Vite) | App nativa (Expo) |
|---|---|---|
| Publicación | Instalable desde el navegador, sin stores | Requiere App Store/Play Store |
| Desarrollo | Mismo stack que los otros 3 clientes | Stack aparte |
| Costo | Cero | $25 Google / $99 Apple |
| Actualizaciones | Automáticas | Re-publicación manual |

### Capacidades del dispositivo en la PWA

| Necesidad | Solución |
|-----------|----------|
| Fotos antes/después | `<input type="file" capture="environment">` o `getUserMedia` (cámara) |
| Ubicación / mapas | `navigator.geolocation` + enlace "Cómo llegar" a Google Maps/Waze |
| Firma del cliente | `<canvas>` táctil |
| Check-in | Botón que registra `Date.now()` + geolocalización |
| Offline (parcial) | Service worker: carga la ruta del día y sube evidencias al reconectar |

### Hoja de ruta diaria

- Lista de trabajos asignados para el día, ordenados por horario.
- Detalle de cada orden: cliente, dirección, servicio, fotos del problema.

### Mapas

- Botón "Cómo llegar" (integración con Google Maps / Waze).
- Mapa con la ubicación de los próximos trabajos.

### Check-in

- Botón de "check-in" al llegar al domicilio (registra hora de llegada).
- Sirve para controlar tiempos reales de trabajo.

### Carga de evidencias

- Fotos **antes** (estado inicial) y **después** (trabajo terminado).
- Subida desde la cámara del celular.
- Las evidencias quedan asociadas a la orden y visibles para el admin.

### Firma del cliente

- Canvas táctil donde el cliente firma al finalizar el trabajo.
- La firma se guarda como imagen en la orden (conformidad del servicio).

---

## API Gateway & Base de Datos

### Endpoints principales (preliminar)

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/v1/whatsapp/webhook` | Webhook del bot de WhatsApp |
| GET | `/api/v1/servicios` | Listar servicios |
| GET | `/api/v1/productos` | Listar productos/repuestos |
| POST | `/api/v1/ordenes` | Crear orden de trabajo |
| GET | `/api/v1/ordenes` | Listar órdenes (filtros) |
| PATCH | `/api/v1/ordenes/:id` | Actualizar estado / asignar técnico |
| GET | `/api/v1/tecnicos` | Listar técnicos |
| POST | `/api/v1/auth/login` | Login (cliente/tecnico/admin) |

### Esquema preliminar de tablas (PostgreSQL)

```sql
-- Clientes
CREATE TABLE clientes (
  id            SERIAL PRIMARY KEY,
  nombre        TEXT NOT NULL,
  telefono      TEXT UNIQUE NOT NULL,
  direccion     TEXT,
  notas         TEXT,
  creado_en     TIMESTAMPTZ DEFAULT now()
);

-- Técnicos
CREATE TABLE tecnicos (
  id            SERIAL PRIMARY KEY,
  nombre        TEXT NOT NULL,
  telefono      TEXT,
  especialidad  TEXT,            -- plomería, electricidad, etc.
  activo        BOOLEAN DEFAULT true
);

-- Servicios
CREATE TABLE servicios (
  id            SERIAL PRIMARY KEY,
  nombre        TEXT NOT NULL,
  categoria     TEXT,            -- plomeria, electricidad, gas, piletas, mantenimiento
  precio_ref    NUMERIC(12,2),
  activo        BOOLEAN DEFAULT true
);

-- Productos / Repuestos
CREATE TABLE productos_repuestos (
  id            SERIAL PRIMARY KEY,
  nombre        TEXT NOT NULL,
  descripcion   TEXT,
  precio        NUMERIC(12,2),
  stock         INTEGER DEFAULT 0,
  con_instalacion BOOLEAN DEFAULT false
);

-- Órdenes de trabajo
CREATE TABLE ordenes_trabajo (
  id            SERIAL PRIMARY KEY,
  cliente_id    INT REFERENCES clientes(id),
  tecnico_id    INT REFERENCES tecnicos(id),
  servicio_id   INT REFERENCES servicios(id),
  estado        TEXT DEFAULT 'pendiente',  -- pendiente, asignada, en_proceso, terminada, cerrada
  urgencia      TEXT DEFAULT 'normal',     -- normal, urgente
  descripcion   TEXT,
  direccion     TEXT,
  fotos         JSONB DEFAULT '[]',        -- URLs de fotos del problema y evidencias
  firma         TEXT,                       -- URL de la imagen de firma del cliente
  checkin_en    TIMESTAMPTZ,
  creado_en     TIMESTAMPTZ DEFAULT now(),
  cerrado_en    TIMESTAMPTZ
);

-- Historial por propiedad (para mantenimiento recurrente)
CREATE TABLE historial_propiedad (
  id            SERIAL PRIMARY KEY,
  cliente_id    INT REFERENCES clientes(id),
  direccion     TEXT NOT NULL,
  detalle       TEXT,
  fecha         TIMESTAMPTZ DEFAULT now()
);
```

---

## Stack tecnológico propuesto

| Capa | Tecnología sugerida |
|------|---------------------|
| Backend | Node.js + Express + TypeScript |
| Bot WhatsApp | WhatsApp Business Cloud API (webhook) |
| Base de datos | PostgreSQL + Prisma/Sequelize |
| Landing / E-commerce (`client-web`) | React + TypeScript + Vite |
| Dashboard Admin (`client-dashboard`) | React + TypeScript + Vite (PC) |
| App Técnico (`client-mobile`) | React + TypeScript + Vite **+ `vite-plugin-pwa`** (PWA instalable) |
| Auth | JWT + roles (`cliente` / `tecnico` / `admin`) |
| Deploy | Docker + VPS / Vercel (fronts) + Cloudflare Tunnel |

> **Nota:** los 4 clientes (`client-web`, `client-dashboard`, `client-mobile`) comparten el mismo stack (React + TS + Vite). `client-mobile` es una **PWA** (app web instalable), no una app nativa.

---

*Documento vivo — se actualiza a medida que avanza el desarrollo.*
