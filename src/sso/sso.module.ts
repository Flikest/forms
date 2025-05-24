import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { SsoController } from './sso.controller';
import { SsoService } from './sso.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [SsoController],
  providers: [SsoService],
})
export class SsoModule {}