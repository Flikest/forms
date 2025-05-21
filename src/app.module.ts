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
  ],
  controllers: [AppController, SsoController],
  providers: [AppService, SsoService],
})
export class AppModule {}
