import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { CreatePlantInput } from './create-plant.input';

@InputType()
export class UpdatePlantInput extends PartialType(CreatePlantInput) {
  @Field(() => ID)
  id: string;
}
