import { Global, Module } from '@nestjs/common';
import { GlobalBdService } from './global-bd.service';

@Global()
@Module({
  providers: [GlobalBdService],
  exports: [GlobalBdService],
})
export class GlobalBdModule {}
