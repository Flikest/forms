import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { SsoController } from './sso.controller';
import { SsoService } from './sso.service';


@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [SsoController],
  providers: [SsoService],
})
export class SsoModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SsoModule)
      .exclude(
        { path: '/sso/logup', method: RequestMethod.ALL },
        { path: '/sso/login', method: RequestMethod.ALL },
      )
      .forRoutes('*');
  }
}