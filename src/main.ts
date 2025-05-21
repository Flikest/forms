import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { InitConfig } from './config/config';
import { setupGracefulShutdown } from 'nestjs-graceful-shutdown';
import { Logger, PinoLogger } from 'nestjs-pino';
import pino from 'pino';

let appconfig: any;

async function bootstrap() {
  try{
    const app = await NestFactory.create(AppModule);
    
    const argv = process.argv;
  
    app.useLogger(app.get(Logger))
  
    //если что это не моя прихать оно таки возврощает any
    let yaml: any;
    yaml = InitConfig(argv.includes("--watch"))
    
    config(yaml.env_path)
  
    setupGracefulShutdown({ app });
  
    await app.listen(yaml.port ?? 3000);
  }catch(error){
    console.error("error with starting app: ", error)
  }
}
bootstrap();

