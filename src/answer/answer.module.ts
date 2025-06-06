import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswersEntity } from 'src/entity/answer.entity';


@Module({
  imports: [TypeOrmModule.forFeature([AnswersEntity])],
  controllers: [AnswerController],
  providers: [AnswerService],
})
export class AnswerModule {
}
