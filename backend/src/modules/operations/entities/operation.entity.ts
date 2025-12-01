import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IndirectCost } from '../../indirect-costs/entities/indirect-cost.entity';

@ObjectType()
export class Operation {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  plantId: string;

  @Field(() => [IndirectCost], { nullable: true })
  costs?: IndirectCost[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
