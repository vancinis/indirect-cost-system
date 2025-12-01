import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreatePlantInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  code: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;
}
