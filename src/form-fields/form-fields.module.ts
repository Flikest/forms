import { Module } from '@nestjs/common';
import { FormFieldsService } from './form-fields.service';
import { FormFieldsController } from './form-fields.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormFieldsEntity } from 'src/entity/forms.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormFieldsEntity])],
  providers: [FormFieldsService],
  controllers: [FormFieldsController]
})
export class FormFieldsModule {}
