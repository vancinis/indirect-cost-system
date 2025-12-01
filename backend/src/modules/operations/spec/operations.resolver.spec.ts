import { Test, TestingModule } from '@nestjs/testing';
import { CreateOperationInput } from '../dto/create-operation.input';
import { UpdateOperationInput } from '../dto/update-operation.input';
import { Operation } from '../entities/operation.entity';
import { OperationsResolver } from '../operations.resolver';
import { OperationsService } from '../operations.service';

describe('OperationsResolver', () => {
  let resolver: OperationsResolver;
  let service: OperationsService;

  const mockOperationsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPlant: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockOperation: Operation = {
    id: 'op-1',
    name: 'Operación Test',
    description: 'Descripción de prueba',
    plantId: 'plant-1',
    createdAt: new Date(),
    updatedAt: new Date(),
    costs: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OperationsResolver,
        {
          provide: OperationsService,
          useValue: mockOperationsService,
        },
      ],
    }).compile();

    resolver = module.get<OperationsResolver>(OperationsResolver);
    service = module.get<OperationsService>(OperationsService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createOperation', () => {
    it('should create an operation', async () => {
      const createInput: CreateOperationInput = {
        name: 'Operación Test',
        plantId: 'plant-1',
        description: 'Descripción de prueba',
      };

      mockOperationsService.create.mockResolvedValue(mockOperation);

      const result = await resolver.createOperation(createInput);

      expect(service.create).toHaveBeenCalledWith(createInput);
      expect(result).toEqual(mockOperation);
    });
  });

  describe('findAll', () => {
    it('should return an array of operations', async () => {
      const mockOperations = [
        mockOperation,
        { ...mockOperation, id: 'op-2', name: 'Operación 2' },
      ];

      mockOperationsService.findAll.mockResolvedValue(mockOperations);

      const result = await resolver.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockOperations);
    });
  });

  describe('findByPlant', () => {
    it('should return operations for a specific plant', async () => {
      const mockOperations = [
        { ...mockOperation, plantId: 'plant-1' },
        { ...mockOperation, id: 'op-2', plantId: 'plant-1' },
      ];

      mockOperationsService.findByPlant.mockResolvedValue(mockOperations);

      const result = await resolver.findByPlant('plant-1');

      expect(service.findByPlant).toHaveBeenCalledWith('plant-1');
      expect(result).toEqual(mockOperations);
    });
  });

  describe('findOne', () => {
    it('should return a single operation', async () => {
      mockOperationsService.findOne.mockResolvedValue(mockOperation);

      const result = await resolver.findOne('op-1');

      expect(service.findOne).toHaveBeenCalledWith('op-1');
      expect(result).toEqual(mockOperation);
    });
  });

  describe('updateOperation', () => {
    it('should update an operation', async () => {
      const updateInput: UpdateOperationInput = {
        id: 'op-1',
        name: 'Operación Actualizada',
      };

      const updatedOperation = { ...mockOperation, name: 'Operación Actualizada' };

      mockOperationsService.update.mockResolvedValue(updatedOperation);

      const result = await resolver.updateOperation(updateInput);

      expect(service.update).toHaveBeenCalledWith('op-1', updateInput);
      expect(result).toEqual(updatedOperation);
    });
  });

  describe('removeOperation', () => {
    it('should remove an operation', async () => {
      mockOperationsService.remove.mockResolvedValue(mockOperation);

      const result = await resolver.removeOperation('op-1');

      expect(service.remove).toHaveBeenCalledWith('op-1');
      expect(result).toEqual(mockOperation);
    });
  });
});
