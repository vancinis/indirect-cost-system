import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { CostInput } from '../../indirect-costs/dto/cost.input';

@InputType()
export class CreateOperationInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @Field(() => ID)
  @IsNotEmpty()
  plantId: string;

  @Field(() => [CostInput], { nullable: true })
  @IsOptional()
  costs?: CostInput[];
}
