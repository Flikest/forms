import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormsService } from './forms.service';
import { Forms } from 'src/entity/forms.entity';
import { FormsController } from './forms.controller';


@Module({
  imports: [TypeOrmModule.forFeature([Forms])],
  controllers: [FormsController],
  providers: [FormsService],
})
export class FormsModule {}
