import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma/prisma.service';
import { CreateOperationInput } from './dto/create-operation.input';
import { UpdateOperationInput } from './dto/update-operation.input';

@Injectable()
export class OperationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOperationInput: CreateOperationInput) {
    const { costs, ...operationData } = createOperationInput;

    return this.prisma.operation.create({
      data: {
        ...operationData,
        costs: costs
          ? {
              create: costs.map((cost) => ({
                volumeRange: cost.volumeRange,
                cost: cost.cost,
              })),
            }
          : undefined,
      },
      include: { costs: true },
    });
  }

  async findAll() {
    return this.prisma.operation.findMany({
      include: { costs: true },
      orderBy: { name: 'asc' },
    });
  }

  async findByPlant(plantId: string) {
    return this.prisma.operation.findMany({
      where: { plantId },
      include: { costs: true },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    const operation = await this.prisma.operation.findUnique({
      where: { id },
      include: { costs: true },
    });

    if (!operation) {
      throw new NotFoundException(`Operation with ID ${id} not found`);
    }

    return operation;
  }

  async update(id: string, updateOperationInput: UpdateOperationInput) {
    await this.findOne(id); // Verify exists

    const { costs, ...operationData } = updateOperationInput;

    // Si hay costos, usamos upsert para actualizar o crear
    if (costs && costs.length > 0) {
      await this.prisma.$transaction(async (tx) => {
        // Actualizar datos de la operación
        await tx.operation.update({
          where: { id },
          data: {
            name: operationData.name,
            description: operationData.description,
          },
        });

        // Upsert de cada costo
        for (const cost of costs) {
          await tx.indirectCost.upsert({
            where: {
              operationId_volumeRange: {
                operationId: id,
                volumeRange: cost.volumeRange,
              },
            },
            update: { cost: cost.cost },
            create: {
              operationId: id,
              volumeRange: cost.volumeRange,
              cost: cost.cost,
            },
          });
        }
      });
    } else {
      await this.prisma.operation.update({
        where: { id },
        data: {
          name: operationData.name,
          description: operationData.description,
        },
      });
    }

    return this.findOne(id);
  }

  async remove(id: string) {
    await this.findOne(id); // Verify exists

    return this.prisma.operation.delete({
      where: { id },
      include: { costs: true },
    });
  }
}
