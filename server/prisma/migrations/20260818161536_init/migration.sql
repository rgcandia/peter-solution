-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('cliente', 'tecnico', 'admin');

-- CreateEnum
CREATE TYPE "EstadoOrden" AS ENUM ('pendiente', 'asignada', 'en_proceso', 'terminada', 'cerrada');

-- CreateEnum
CREATE TYPE "Urgencia" AS ENUM ('normal', 'urgente');

-- CreateEnum
CREATE TYPE "CategoriaServicio" AS ENUM ('plomeria', 'electricidad', 'gas', 'piletas', 'mantenimiento');

-- CreateTable
CREATE TABLE "clientes" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "direccion" TEXT,
    "notas" TEXT,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tecnicos" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "telefono" TEXT,
    "especialidad" "CategoriaServicio",
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "tecnicos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "servicios" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "categoria" "CategoriaServicio",
    "precio_ref" DECIMAL(12,2),
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "servicios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productos_repuestos" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "precio" DECIMAL(12,2),
    "stock" INTEGER NOT NULL DEFAULT 0,
    "con_instalacion" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "productos_repuestos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ordenes_trabajo" (
    "id" SERIAL NOT NULL,
    "cliente_id" INTEGER NOT NULL,
    "tecnico_id" INTEGER,
    "servicio_id" INTEGER,
    "estado" "EstadoOrden" NOT NULL DEFAULT 'pendiente',
    "urgencia" "Urgencia" NOT NULL DEFAULT 'normal',
    "descripcion" TEXT,
    "direccion" TEXT,
    "fotos" JSONB NOT NULL DEFAULT '[]',
    "firma" TEXT,
    "checkin_en" TIMESTAMP(3),
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cerrado_en" TIMESTAMP(3),

    CONSTRAINT "ordenes_trabajo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "historial_propiedad" (
    "id" SERIAL NOT NULL,
    "cliente_id" INTEGER NOT NULL,
    "direccion" TEXT NOT NULL,
    "detalle" TEXT,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "historial_propiedad_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clientes_telefono_key" ON "clientes"("telefono");

-- CreateIndex
CREATE INDEX "ordenes_trabajo_estado_idx" ON "ordenes_trabajo"("estado");

-- CreateIndex
CREATE INDEX "ordenes_trabajo_cliente_id_idx" ON "ordenes_trabajo"("cliente_id");

-- CreateIndex
CREATE INDEX "ordenes_trabajo_tecnico_id_idx" ON "ordenes_trabajo"("tecnico_id");

-- CreateIndex
CREATE INDEX "historial_propiedad_cliente_id_idx" ON "historial_propiedad"("cliente_id");

-- AddForeignKey
ALTER TABLE "ordenes_trabajo" ADD CONSTRAINT "ordenes_trabajo_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordenes_trabajo" ADD CONSTRAINT "ordenes_trabajo_tecnico_id_fkey" FOREIGN KEY ("tecnico_id") REFERENCES "tecnicos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordenes_trabajo" ADD CONSTRAINT "ordenes_trabajo_servicio_id_fkey" FOREIGN KEY ("servicio_id") REFERENCES "servicios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historial_propiedad" ADD CONSTRAINT "historial_propiedad_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "clientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
