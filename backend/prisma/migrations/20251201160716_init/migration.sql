-- CreateEnum
CREATE TYPE "VolumeRange" AS ENUM ('RANGE_300KG', 'RANGE_500KG', 'RANGE_1T', 'RANGE_3T', 'RANGE_5T', 'RANGE_10T', 'RANGE_20T', 'RANGE_30T');

-- CreateTable
CREATE TABLE "plants" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "plants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "operations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "plant_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "operations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "indirect_costs" (
    "id" TEXT NOT NULL,
    "operation_id" TEXT NOT NULL,
    "volume_range" "VolumeRange" NOT NULL,
    "cost" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "indirect_costs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "plants_code_key" ON "plants"("code");

-- CreateIndex
CREATE INDEX "operations_plant_id_idx" ON "operations"("plant_id");

-- CreateIndex
CREATE UNIQUE INDEX "operations_plant_id_name_key" ON "operations"("plant_id", "name");

-- CreateIndex
CREATE INDEX "indirect_costs_operation_id_idx" ON "indirect_costs"("operation_id");

-- CreateIndex
CREATE UNIQUE INDEX "indirect_costs_operation_id_volume_range_key" ON "indirect_costs"("operation_id", "volume_range");

-- AddForeignKey
ALTER TABLE "operations" ADD CONSTRAINT "operations_plant_id_fkey" FOREIGN KEY ("plant_id") REFERENCES "plants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "indirect_costs" ADD CONSTRAINT "indirect_costs_operation_id_fkey" FOREIGN KEY ("operation_id") REFERENCES "operations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
