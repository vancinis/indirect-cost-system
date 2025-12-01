import { Module } from '@nestjs/common';
import { OperationsResolver } from './operations.resolver';
import { OperationsService } from './operations.service';

@Module({
  providers: [OperationsResolver, OperationsService],
  exports: [OperationsService],
})
export class OperationsModule {}
