import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, VolumeRange } from '@prisma/client';
import 'dotenv/config';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const VOLUME_RANGES: VolumeRange[] = [
  VolumeRange.RANGE_300KG,
  VolumeRange.RANGE_500KG,
  VolumeRange.RANGE_1T,
  VolumeRange.RANGE_3T,
  VolumeRange.RANGE_5T,
  VolumeRange.RANGE_10T,
  VolumeRange.RANGE_20T,
  VolumeRange.RANGE_30T,
];

async function main() {
  // Crear plantas
  const plant1 = await prisma.plant.create({
    data: {
      name: 'Planta Lima Norte',
      code: 'PLN',
      description: 'Sede principal de producción',
    },
  });

  const plant2 = await prisma.plant.create({
    data: {
      name: 'Planta Arequipa',
      code: 'PAQ',
      description: 'Sede de producción sur',
    },
  });

  // Operaciones para Planta 1
  const operations1 = [
    { name: 'Impresión', description: 'Impresión flexográfica' },
    { name: 'Laminado', description: 'Laminado en frío y caliente' },
    { name: 'Embolsado', description: 'Proceso de embolsado automático' },
    { name: 'Corte', description: 'Corte y rebobinado' },
  ];

  for (const op of operations1) {
    await prisma.operation.create({
      data: {
        ...op,
        plantId: plant1.id,
        costs: {
          create: VOLUME_RANGES.map((range, index) => ({
            volumeRange: range,
            cost: 0.2 - index * 0.02,
          })),
        },
      },
    });
  }

  // Operaciones para Planta 2
  const operations2 = [
    { name: 'Impresión', description: 'Impresión offset' },
    { name: 'Sellado', description: 'Sellado térmico' },
    { name: 'Extrusión', description: 'Extrusión de película' },
  ];

  for (const op of operations2) {
    await prisma.operation.create({
      data: {
        ...op,
        plantId: plant2.id,
        costs: {
          create: VOLUME_RANGES.map((range, index) => ({
            volumeRange: range,
            cost: 0.25 - index * 0.025,
          })),
        },
      },
    });
  }

  console.log('Seed completed!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
