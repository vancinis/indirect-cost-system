import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { CostInput } from '../../indirect-costs/dto/cost.input';
import { CreateOperationInput } from './create-operation.input';

@InputType()
export class UpdateOperationInput extends PartialType(
  OmitType(CreateOperationInput, ['plantId'] as const),
) {
  @Field(() => ID)
  id: string;

  @Field(() => [CostInput], { nullable: true })
  costs?: CostInput[];
}
