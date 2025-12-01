import { Test, TestingModule } from '@nestjs/testing';
import { CreatePlantInput } from '../dto/create-plant.input';
import { UpdatePlantInput } from '../dto/update-plant.input';
import { Plant } from '../entities/plant.entity';
import { PlantsResolver } from '../plants.resolver';
import { PlantsService } from '../plants.service';

describe('PlantsResolver', () => {
  let resolver: PlantsResolver;
  let service: PlantsService;

  const mockPlantsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockPlant: Plant = {
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
        PlantsResolver,
        {
          provide: PlantsService,
          useValue: mockPlantsService,
        },
      ],
    }).compile();

    resolver = module.get<PlantsResolver>(PlantsResolver);
    service = module.get<PlantsService>(PlantsService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createPlant', () => {
    it('should create a plant', async () => {
      const createInput: CreatePlantInput = {
        name: 'Planta Test',
        code: 'PT',
        description: 'Descripción de prueba',
      };

      mockPlantsService.create.mockResolvedValue(mockPlant);

      const result = await resolver.createPlant(createInput);

      expect(service.create).toHaveBeenCalledWith(createInput);
      expect(result).toEqual(mockPlant);
    });
  });

  describe('findAll', () => {
    it('should return an array of plants', async () => {
      const mockPlants = [mockPlant, { ...mockPlant, id: 'plant-2' }];

      mockPlantsService.findAll.mockResolvedValue(mockPlants);

      const result = await resolver.findAll();

      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockPlants);
    });
  });

  describe('findOne', () => {
    it('should return a single plant', async () => {
      mockPlantsService.findOne.mockResolvedValue(mockPlant);

      const result = await resolver.findOne('plant-1');

      expect(service.findOne).toHaveBeenCalledWith('plant-1');
      expect(result).toEqual(mockPlant);
    });
  });

  describe('updatePlant', () => {
    it('should update a plant', async () => {
      const updateInput: UpdatePlantInput = {
        id: 'plant-1',
        name: 'Planta Actualizada',
      };

      const updatedPlant = { ...mockPlant, name: 'Planta Actualizada' };

      mockPlantsService.update.mockResolvedValue(updatedPlant);

      const result = await resolver.updatePlant(updateInput);

      expect(service.update).toHaveBeenCalledWith('plant-1', updateInput);
      expect(result).toEqual(updatedPlant);
    });
  });

  describe('removePlant', () => {
    it('should remove a plant', async () => {
      mockPlantsService.remove.mockResolvedValue(mockPlant);

      const result = await resolver.removePlant('plant-1');

      expect(service.remove).toHaveBeenCalledWith('plant-1');
      expect(result).toEqual(mockPlant);
    });
  });
});
