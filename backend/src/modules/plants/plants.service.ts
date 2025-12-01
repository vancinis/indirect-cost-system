import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma/prisma.service';
import { CreatePlantInput } from './dto/create-plant.input';
import { UpdatePlantInput } from './dto/update-plant.input';

@Injectable()
export class PlantsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPlantInput: CreatePlantInput) {
    return this.prisma.plant.create({
      data: createPlantInput,
      include: {
        operations: {
          include: { costs: true },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.plant.findMany({
      include: {
        operations: {
          include: { costs: true },
        },
      },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    const plant = await this.prisma.plant.findUnique({
      where: { id },
      include: {
        operations: {
          include: { costs: true },
          orderBy: { name: 'asc' },
        },
      },
    });

    if (!plant) {
      throw new NotFoundException(`Plant with ID ${id} not found`);
    }

    return plant;
  }

  async update(id: string, updatePlantInput: UpdatePlantInput) {
    await this.findOne(id); // Verify exists

    return this.prisma.plant.update({
      where: { id },
      data: {
        name: updatePlantInput.name,
        code: updatePlantInput.code,
        description: updatePlantInput.description,
      },
      include: {
        operations: {
          include: { costs: true },
        },
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id); // Verify exists

    return this.prisma.plant.delete({
      where: { id },
      include: {
        operations: {
          include: { costs: true },
        },
      },
    });
  }
}
