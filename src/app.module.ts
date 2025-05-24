import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgresConnection } from './db.connection';
import { GracefulShutdownModule } from 'nestjs-graceful-shutdown';
import { LoggerModule } from 'nestjs-pino';
import { FormFieldsModule } from './form-fields/form-fields.module';
import { AnswerModule } from './answer/answer.module';
import { FormsModule } from './forms/forms.module';
import { SsoModule } from './sso/sso.module';

@Module({
  imports: [
    LoggerModule.forRoot(),
    GracefulShutdownModule.forRoot(),
    // @ts-ignore
    TypeOrmModule.forRoot({
      ...postgresConnection,
      entities: [],
      migrations: ["/entity/"],
      synchronize: false,
    }),
    SsoModule,
    FormsModule,
    FormFieldsModule,
    AnswerModule,
  ],
})
export class AppModule {}
