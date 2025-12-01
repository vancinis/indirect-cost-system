import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePlantInput } from './dto/create-plant.input';
import { UpdatePlantInput } from './dto/update-plant.input';
import { Plant } from './entities/plant.entity';
import { PlantsService } from './plants.service';

@Resolver(() => Plant)
export class PlantsResolver {
  constructor(private readonly plantsService: PlantsService) {}

  @Mutation(() => Plant)
  createPlant(@Args('createPlantInput') createPlantInput: CreatePlantInput) {
    return this.plantsService.create(createPlantInput);
  }

  @Query(() => [Plant], { name: 'plants' })
  findAll() {
    return this.plantsService.findAll();
  }

  @Query(() => Plant, { name: 'plant' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.plantsService.findOne(id);
  }

  @Mutation(() => Plant)
  updatePlant(@Args('updatePlantInput') updatePlantInput: UpdatePlantInput) {
    return this.plantsService.update(updatePlantInput.id, updatePlantInput);
  }

  @Mutation(() => Plant)
  removePlant(@Args('id', { type: () => ID }) id: string) {
    return this.plantsService.remove(id);
  }
}
