import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { SsoController } from './sso.controller';
import { SsoService } from './sso.service';
import { SsoMiddleware } from './sso.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [SsoController],
  providers: [SsoService],
})
export class SsoModule {
  configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(SsoMiddleware)
          .forRoutes('*');
      }
}