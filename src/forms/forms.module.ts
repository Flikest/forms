import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormsService } from './forms.service';
import { FormsEntity } from 'src/entity/forms.entity';
import { FormsController } from './forms.controller';
import { SsoMiddleware } from 'src/sso/sso.middleware';


@Module({
  imports: [TypeOrmModule.forFeature([FormsEntity])],
  controllers: [FormsController],
  providers: [FormsService],
})
export class FormsModule {
  configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(SsoMiddleware)
          .forRoutes('*');
      }
}
