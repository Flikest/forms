import { MiddlewareConsumer, Module } from '@nestjs/common';
import { FormFieldsService } from './form-fields.service';
import { FormFieldsController } from './form-fields.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormFieldsEntity } from 'src/entity/forms.entity';
import { SsoMiddleware } from 'src/sso/sso.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([FormFieldsEntity])],
  providers: [FormFieldsService],
  controllers: [FormFieldsController]
})
export class FormFieldsModule {
  configure(consumer: MiddlewareConsumer) {
      consumer
        .apply(SsoMiddleware)
        .forRoutes('*');
    }
}
