# Peter Solution Multiservicios 🛠️

Sistema integral para la gestión de **Peter Solution** — empresa de servicios a domicilio, reparaciones y mantenimiento integral del hogar (plomería, electricidad, gas, piletas, mantenimiento general).

---

## 📞 Datos de contacto

| Dato | Valor |
|------|-------|
| Nombre comercial | Peter Solution / Peter Multiservicio |
| Rubro | Servicios a domicilio, reparaciones y mantenimiento del hogar |
| Teléfono / WhatsApp | [+54 9 11 3098-3806](https://wa.me/5491130983806) |
| Instagram | [@petermultiservicio](https://www.instagram.com/petermultiservicio) |

---

## 🎨 Paleta de colores oficial

| Color | Hex | Uso |
|-------|-----|-----|
| Azul oscuro | `#1A237E` | Primario — fondos, headers, botones principales |
| Rojo | `#D32F2F` | Secundario — acentos, llamados a la acción, alertas |
| Blanco | `#FFFFFF` | Fondos claros, texto sobre azul |
| Gris oscuro | `#212121` | Texto principal |
| Gris medio | `#757575` | Texto secundario |

Iconografía: herramientas, engranajes y mantenimiento.

---

## 🏗️ Visión general del ecosistema digital

Peter Solution tendrá un ecosistema modular (monorepo) con 5 piezas:

```
┌─────────────────────────────────────────────────────────┐
│                    WHATSAPP (cliente)                   │
└───────────────────────┬─────────────────────────────────┘
                        ▼
┌─────────────────────────────────────────────────────────┐
│              SERVER (Backend + API Gateway)             │
│  • Bot de WhatsApp (webhook)                            │
│  • API REST / Gateway                                   │
│  • Lógica de negocio + Base de Datos                    │
└──────┬──────────────┬───────────────┬───────────────────┘
       ▼              ▼               ▼
┌────────────┐ ┌─────────────┐ ┌──────────────┐
│ client-web │ │  dashboard  │ │ client-mobile│
│ Landing +  │ │  Admin (PC) │ │ App/PWA del  │
│ E-commerce │ │  del dueño  │ │ técnico      │
└────────────┘ └─────────────┘ └──────────────┘
```

| Componente | Descripción |
|------------|-------------|
| **`server/`** | Backend: API Gateway, Bot de WhatsApp (webhook), lógica de negocio y base de datos |
| **`client-web/`** | Landing web, catálogo de servicios/productos, e-commerce y feed de Instagram |
| **`client-dashboard/`** | Dashboard de administración para el dueño (PC): Kanban de órdenes, técnicos, agenda, config del bot |
| **`client-mobile/`** | WebApp/PWA para el técnico en campo: hoja de ruta, mapas, check-in, evidencias y firma |

---

## 📁 Estructura del repositorio

```text
peter-solution/
├── docs/                      # Documentación, arquitectura y propuestas
│   ├── TASK_README.md         # Roadmap & Backlog por fases
│   └── ARQUITECTURA_Y_PROPUESTAS.md
├── server/                    # Backend (API Gateway, Bot WhatsApp, Lógica de Negocio)
├── client-web/                # Landing Web, E-commerce y Portal de Clientes
├── client-dashboard/          # Dashboard Admin para el dueño (PC)
├── client-mobile/             # App/PWA para el Técnico en campo
└── README.md
```

---

## ⚙️ Configuración en entorno local

### Requisitos

- Node.js 20+ y npm
- Git
- (Opcional) Docker para servicios de base de datos

### Pasos (a completar según se vaya implementando cada módulo)

```bash
# 1. Clonar el repositorio
git clone <repo-url> peter-solution
cd peter-solution

# 2. Instalar dependencias de cada módulo (cuando existan)
# cd server && npm install
# cd ../client-web && npm install
# cd ../client-dashboard && npm install
# cd ../client-mobile && npm install

# 3. Configurar variables de entorno (.env en cada módulo)

# 4. Levantar en desarrollo
# cd server && npm run dev
# cd ../client-web && npm run dev
```

> ⚠️ Los módulos están en fase de planificación. Ver `docs/TASK_README.md` para el roadmap.

---

## 📚 Documentación

- [`docs/TASK_README.md`](docs/TASK_README.md) — Roadmap y backlog por fases
- [`docs/ARQUITECTURA_Y_PROPUESTAS.md`](docs/ARQUITECTURA_Y_PROPUESTAS.md) — Arquitectura técnica detallada

---

## Licencia

Privado — uso interno de Peter Solution.
