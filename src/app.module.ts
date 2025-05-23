import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { SsoService } from './sso/sso.service';
import { SsoController } from './sso/sso.controller';
import { postgresConnection } from './db.connection';
import { GracefulShutdownModule } from 'nestjs-graceful-shutdown';
import { LoggerModule } from 'nestjs-pino';
import { FormFieldsModule } from './form-fields/form-fields.module';
import { AnswerModule } from './answer/answer.module';

@Module({
  imports: [
    LoggerModule.forRoot(),
    GracefulShutdownModule.forRoot(),
    // @ts-ignore
    TypeOrmModule.forRoot({
      ...postgresConnection,
      entities: [User],
      migrations: ["/entity/"],
      synchronize: false,
    }),
    FormFieldsModule,
    AnswerModule,
  ],
  controllers: [AppController, SsoController],
  providers: [AppService, SsoService],
})
export class AppModule {}
