import { Module } from '@nestjs/common';
import { ID_SERVICE } from './id-service.interface';
import { Uuid4Service } from './uuid4.service';

@Module({
  providers: [{ provide: ID_SERVICE, useClass: Uuid4Service }],
  exports: [ID_SERVICE],
})
export class IdModule {}
