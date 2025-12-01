import { Field, ID, ObjectType } from '@nestjs/graphql';
import { VolumeRange } from './volume-range.enum';

@ObjectType()
export class IndirectCost {
  @Field(() => ID)
  id: string;

  @Field()
  operationId: string;

  @Field(() => VolumeRange)
  volumeRange: VolumeRange;

  @Field(() => String)
  cost: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
