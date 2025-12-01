import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Operation } from '../../operations/entities/operation.entity';

@ObjectType()
export class Plant {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  code: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [Operation], { nullable: true })
  operations?: Operation[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
