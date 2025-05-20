import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { SsoService } from './sso/sso.service';
import { SsoController } from './sso/sso.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      entities: [User],
      migrations: ["/entity/"],
      synchronize: false,
    }),
  ],
  controllers: [AppController, SsoController],
  providers: [AppService, SsoService],
})
export class AppModule {}
