import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateOperationInput } from './dto/create-operation.input';
import { UpdateOperationInput } from './dto/update-operation.input';
import { Operation } from './entities/operation.entity';
import { OperationsService } from './operations.service';

@Resolver(() => Operation)
export class OperationsResolver {
  constructor(private readonly operationsService: OperationsService) {}

  @Mutation(() => Operation)
  createOperation(
    @Args('createOperationInput') createOperationInput: CreateOperationInput,
  ) {
    return this.operationsService.create(createOperationInput);
  }

  @Query(() => [Operation], { name: 'operations' })
  findAll() {
    return this.operationsService.findAll();
  }

  @Query(() => [Operation], { name: 'operationsByPlant' })
  findByPlant(@Args('plantId', { type: () => ID }) plantId: string) {
    return this.operationsService.findByPlant(plantId);
  }

  @Query(() => Operation, { name: 'operation' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.operationsService.findOne(id);
  }

  @Mutation(() => Operation)
  updateOperation(
    @Args('updateOperationInput') updateOperationInput: UpdateOperationInput,
  ) {
    return this.operationsService.update(
      updateOperationInput.id,
      updateOperationInput,
    );
  }

  @Mutation(() => Operation)
  removeOperation(@Args('id', { type: () => ID }) id: string) {
    return this.operationsService.remove(id);
  }
}
