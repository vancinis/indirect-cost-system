import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../core/database/prisma/prisma.service';
import { VolumeRange } from '../../indirect-costs/entities/volume-range.enum';
import { CreateOperationInput } from '../dto/create-operation.input';
import { UpdateOperationInput } from '../dto/update-operation.input';
import { OperationsService } from '../operations.service';

describe('OperationsService', () => {
  let service: OperationsService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    operation: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    indirectCost: {
      upsert: jest.fn(),
    },
    $transaction: jest.fn(),
  };

  const mockOperation = {
    id: 'op-1',
    name: 'Operación Test',
    description: 'Descripción de prueba',
    plantId: 'plant-1',
    createdAt: new Date(),
    updatedAt: new Date(),
    costs: [],
  };

  const mockCost = {
    id: 'cost-1',
    operationId: 'op-1',
    volumeRange: VolumeRange.RANGE_300KG,
    cost: 0.15,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OperationsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<OperationsService>(OperationsService);
    prismaService = module.get<PrismaService>(PrismaService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an operation without costs', async () => {
      const createInput: CreateOperationInput = {
        name: 'Operación Test',
        description: 'Descripción de prueba',
        plantId: 'plant-1',
      };

      mockPrismaService.operation.create.mockResolvedValue(mockOperation);

      const result = await service.create(createInput);

      expect(prismaService.operation.create).toHaveBeenCalledWith({
        data: {
          name: createInput.name,
          description: createInput.description,
          plantId: createInput.plantId,
          costs: undefined,
        },
        include: { costs: true },
      });
      expect(result).toEqual(mockOperation);
    });

    it('should create an operation with costs', async () => {
      const createInput: CreateOperationInput = {
        name: 'Operación Test',
        plantId: 'plant-1',
        costs: [
          {
            volumeRange: VolumeRange.RANGE_300KG,
            cost: 0.15,
          },
          {
            volumeRange: VolumeRange.RANGE_500KG,
            cost: 0.12,
          },
        ],
      };

      const operationWithCosts = {
        ...mockOperation,
        costs: [mockCost],
      };

      mockPrismaService.operation.create.mockResolvedValue(operationWithCosts);

      const result = await service.create(createInput);

      expect(prismaService.operation.create).toHaveBeenCalledWith({
        data: {
          name: createInput.name,
          description: createInput.description,
          plantId: createInput.plantId,
          costs: {
            create: [
              {
                volumeRange: VolumeRange.RANGE_300KG,
                cost: 0.15,
              },
              {
                volumeRange: VolumeRange.RANGE_500KG,
                cost: 0.12,
              },
            ],
          },
        },
        include: { costs: true },
      });
      expect(result).toEqual(operationWithCosts);
    });
  });

  describe('findAll', () => {
    it('should return an array of operations', async () => {
      const mockOperations = [
        mockOperation,
        { ...mockOperation, id: 'op-2', name: 'Operación 2' },
      ];

      mockPrismaService.operation.findMany.mockResolvedValue(mockOperations);

      const result = await service.findAll();

      expect(prismaService.operation.findMany).toHaveBeenCalledWith({
        include: { costs: true },
        orderBy: { name: 'asc' },
      });
      expect(result).toEqual(mockOperations);
    });

    it('should return an empty array when no operations exist', async () => {
      mockPrismaService.operation.findMany.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findByPlant', () => {
    it('should return operations for a specific plant', async () => {
      const mockOperations = [
        { ...mockOperation, plantId: 'plant-1' },
        { ...mockOperation, id: 'op-2', plantId: 'plant-1' },
      ];

      mockPrismaService.operation.findMany.mockResolvedValue(mockOperations);

      const result = await service.findByPlant('plant-1');

      expect(prismaService.operation.findMany).toHaveBeenCalledWith({
        where: { plantId: 'plant-1' },
        include: { costs: true },
        orderBy: { name: 'asc' },
      });
      expect(result).toEqual(mockOperations);
      expect(result.every((op) => op.plantId === 'plant-1')).toBe(true);
    });

    it('should return an empty array when plant has no operations', async () => {
      mockPrismaService.operation.findMany.mockResolvedValue([]);

      const result = await service.findByPlant('plant-1');

      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return an operation when found', async () => {
      mockPrismaService.operation.findUnique.mockResolvedValue(mockOperation);

      const result = await service.findOne('op-1');

      expect(prismaService.operation.findUnique).toHaveBeenCalledWith({
        where: { id: 'op-1' },
        include: { costs: true },
      });
      expect(result).toEqual(mockOperation);
    });

    it('should throw NotFoundException when operation does not exist', async () => {
      mockPrismaService.operation.findUnique.mockResolvedValue(null);

      await expect(service.findOne('non-existent')).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.findOne('non-existent')).rejects.toThrow(
        'Operation with ID non-existent not found',
      );
    });
  });

  describe('update', () => {
    it('should update an operation without costs', async () => {
      const updateInput: UpdateOperationInput = {
        id: 'op-1',
        name: 'Operación Actualizada',
        description: 'Nueva descripción',
      };

      const updatedOperation = { ...mockOperation, ...updateInput };

      mockPrismaService.operation.findUnique.mockResolvedValue(mockOperation);
      mockPrismaService.operation.update.mockResolvedValue(updatedOperation);
      mockPrismaService.operation.findUnique.mockResolvedValueOnce(mockOperation);
      mockPrismaService.operation.findUnique.mockResolvedValueOnce(updatedOperation);

      const result = await service.update('op-1', updateInput);

      expect(prismaService.operation.findUnique).toHaveBeenCalled();
      expect(prismaService.operation.update).toHaveBeenCalledWith({
        where: { id: 'op-1' },
        data: {
          name: updateInput.name,
          description: updateInput.description,
        },
      });
      expect(result).toEqual(updatedOperation);
    });

    it('should update an operation with costs using transaction', async () => {
      const updateInput: UpdateOperationInput = {
        id: 'op-1',
        name: 'Operación Actualizada',
        costs: [
          {
            volumeRange: VolumeRange.RANGE_300KG,
            cost: 0.20,
          },
        ],
      };

      const updatedOperation = {
        ...mockOperation,
        name: updateInput.name,
        costs: [{ ...mockCost, cost: 0.20 }],
      };

      const mockTransaction = jest.fn(async (callback) => {
        const tx = {
          operation: {
            update: jest.fn().mockResolvedValue(updatedOperation),
          },
          indirectCost: {
            upsert: jest.fn().mockResolvedValue(mockCost),
          },
        };
        return callback(tx);
      });

      mockPrismaService.$transaction.mockImplementation(mockTransaction);
      mockPrismaService.operation.findUnique
        .mockResolvedValueOnce(mockOperation)
        .mockResolvedValueOnce(updatedOperation);

      const result = await service.update('op-1', updateInput);

      expect(prismaService.$transaction).toHaveBeenCalled();
      expect(result).toEqual(updatedOperation);
    });

    it('should throw NotFoundException when updating non-existent operation', async () => {
      const updateInput: UpdateOperationInput = {
        id: 'non-existent',
        name: 'Operación Actualizada',
      };

      mockPrismaService.operation.findUnique.mockResolvedValue(null);

      await expect(service.update('non-existent', updateInput)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should delete an operation successfully', async () => {
      mockPrismaService.operation.findUnique.mockResolvedValue(mockOperation);
      mockPrismaService.operation.delete.mockResolvedValue(mockOperation);

      const result = await service.remove('op-1');

      expect(prismaService.operation.findUnique).toHaveBeenCalledWith({
        where: { id: 'op-1' },
        include: { costs: true },
      });
      expect(prismaService.operation.delete).toHaveBeenCalledWith({
        where: { id: 'op-1' },
        include: { costs: true },
      });
      expect(result).toEqual(mockOperation);
    });

    it('should throw NotFoundException when deleting non-existent operation', async () => {
      mockPrismaService.operation.findUnique.mockResolvedValue(null);

      await expect(service.remove('non-existent')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
