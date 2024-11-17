import { Global, Module } from '@nestjs/common';
import { GlobalBdService } from './global-bd.service';
import { UserEntity } from 'src/users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  providers: [GlobalBdService],
  exports: [GlobalBdService],
  imports: [TypeOrmModule.forFeature([UserEntity])],
})
export class GlobalBdModule {}
