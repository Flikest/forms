import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswersEntity } from 'src/entity/answer.entity';
import { SsoMiddleware } from 'src/sso/sso.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([AnswersEntity])],
  controllers: [AnswerController],
  providers: [AnswerService],
})
export class AnswerModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SsoMiddleware)
      .forRoutes('*');
  }
}
