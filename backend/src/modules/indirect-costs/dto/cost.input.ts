import { Field, Float, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { VolumeRange } from '../entities/volume-range.enum';

@InputType()
export class CostInput {
  @Field(() => VolumeRange)
  @IsNotEmpty()
  @IsEnum(VolumeRange)
  volumeRange: VolumeRange;

  @Field(() => Float)
  @IsNumber()
  @Min(0)
  cost: number;
}
