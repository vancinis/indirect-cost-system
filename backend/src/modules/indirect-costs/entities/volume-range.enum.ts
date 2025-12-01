import { registerEnumType } from '@nestjs/graphql';

export enum VolumeRange {
  RANGE_300KG = 'RANGE_300KG',
  RANGE_500KG = 'RANGE_500KG',
  RANGE_1T = 'RANGE_1T',
  RANGE_3T = 'RANGE_3T',
  RANGE_5T = 'RANGE_5T',
  RANGE_10T = 'RANGE_10T',
  RANGE_20T = 'RANGE_20T',
  RANGE_30T = 'RANGE_30T',
}

registerEnumType(VolumeRange, {
  name: 'VolumeRange',
  description: 'Rangos de volumen para costos indirectos',
});
