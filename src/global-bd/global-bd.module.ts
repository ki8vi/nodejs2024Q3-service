import { Global, Module } from '@nestjs/common';
import { GlobalBdService } from './global-bd.service';
import { AuthModule } from 'src/auth/auth.module';

@Global()
@Module({
  imports: [AuthModule],
  providers: [GlobalBdService],
  exports: [GlobalBdService],
})
export class GlobalBdModule {}
