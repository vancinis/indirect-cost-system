import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../core/database/prisma/prisma.service';
import { CreatePlantInput } from '../dto/create-plant.input';
import { UpdatePlantInput } from '../dto/update-plant.input';
import { PlantsService } from '../plants.service';

describe('PlantsService', () => {
  let service: PlantsService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    plant: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  const mockPlant = {
    id: 'plant-1',
    name: 'Planta Test',
    code: 'PT',
    description: 'Descripción de prueba',
    createdAt: new Date(),
    updatedAt: new Date(),
    operations: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlantsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<PlantsService>(PlantsService);
    prismaService = module.get<PrismaService>(PrismaService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a plant successfully', async () => {
      const createInput: CreatePlantInput = {
        name: 'Planta Test',
        code: 'PT',
        description: 'Descripción de prueba',
      };

      mockPrismaService.plant.create.mockResolvedValue(mockPlant);

      const result = await service.create(createInput);

      expect(prismaService.plant.create).toHaveBeenCalledWith({
        data: createInput,
        include: {
          operations: {
            include: { costs: true },
          },
        },
      });
      expect(result).toEqual(mockPlant);
    });

    it('should create a plant without description', async () => {
      const createInput: CreatePlantInput = {
        name: 'Planta Test',
        code: 'PT',
      };

      mockPrismaService.plant.create.mockResolvedValue({
        ...mockPlant,
        description: null,
      });

      const result = await service.create(createInput);

      expect(prismaService.plant.create).toHaveBeenCalledWith({
        data: createInput,
        include: {
          operations: {
            include: { costs: true },
          },
        },
      });
      expect(result.description).toBeNull();
    });
  });

  describe('findAll', () => {
    it('should return an array of plants', async () => {
      const mockPlants = [mockPlant, { ...mockPlant, id: 'plant-2', name: 'Planta 2' }];

      mockPrismaService.plant.findMany.mockResolvedValue(mockPlants);

      const result = await service.findAll();

      expect(prismaService.plant.findMany).toHaveBeenCalledWith({
        include: {
          operations: {
            include: { costs: true },
          },
        },
        orderBy: { name: 'asc' },
      });
      expect(result).toEqual(mockPlants);
    });

    it('should return an empty array when no plants exist', async () => {
      mockPrismaService.plant.findMany.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a plant when found', async () => {
      mockPrismaService.plant.findUnique.mockResolvedValue(mockPlant);

      const result = await service.findOne('plant-1');

      expect(prismaService.plant.findUnique).toHaveBeenCalledWith({
        where: { id: 'plant-1' },
        include: {
          operations: {
            include: { costs: true },
            orderBy: { name: 'asc' },
          },
        },
      });
      expect(result).toEqual(mockPlant);
    });

    it('should throw NotFoundException when plant does not exist', async () => {
      mockPrismaService.plant.findUnique.mockResolvedValue(null);

      await expect(service.findOne('non-existent')).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.findOne('non-existent')).rejects.toThrow(
        'Plant with ID non-existent not found',
      );
    });
  });

  describe('update', () => {
    it('should update a plant successfully', async () => {
      const updateInput: UpdatePlantInput = {
        id: 'plant-1',
        name: 'Planta Actualizada',
        code: 'PA',
      };

      const updatedPlant = { ...mockPlant, ...updateInput };

      mockPrismaService.plant.findUnique.mockResolvedValue(mockPlant);
      mockPrismaService.plant.update.mockResolvedValue(updatedPlant);

      const result = await service.update('plant-1', updateInput);

      expect(prismaService.plant.findUnique).toHaveBeenCalledWith({
        where: { id: 'plant-1' },
        include: {
          operations: {
            include: { costs: true },
            orderBy: { name: 'asc' },
          },
        },
      });
      expect(prismaService.plant.update).toHaveBeenCalledWith({
        where: { id: 'plant-1' },
        data: {
          name: updateInput.name,
          code: updateInput.code,
          description: updateInput.description,
        },
        include: {
          operations: {
            include: { costs: true },
          },
        },
      });
      expect(result).toEqual(updatedPlant);
    });

    it('should throw NotFoundException when updating non-existent plant', async () => {
      const updateInput: UpdatePlantInput = {
        id: 'non-existent',
        name: 'Planta Actualizada',
      };

      mockPrismaService.plant.findUnique.mockResolvedValue(null);

      await expect(service.update('non-existent', updateInput)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should delete a plant successfully', async () => {
      mockPrismaService.plant.findUnique.mockResolvedValue(mockPlant);
      mockPrismaService.plant.delete.mockResolvedValue(mockPlant);

      const result = await service.remove('plant-1');

      expect(prismaService.plant.findUnique).toHaveBeenCalledWith({
        where: { id: 'plant-1' },
        include: {
          operations: {
            include: { costs: true },
            orderBy: { name: 'asc' },
          },
        },
      });
      expect(prismaService.plant.delete).toHaveBeenCalledWith({
        where: { id: 'plant-1' },
        include: {
          operations: {
            include: { costs: true },
          },
        },
      });
      expect(result).toEqual(mockPlant);
    });

    it('should throw NotFoundException when deleting non-existent plant', async () => {
      mockPrismaService.plant.findUnique.mockResolvedValue(null);

      await expect(service.remove('non-existent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
