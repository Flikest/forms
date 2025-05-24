import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config as yamlConfig }  from 'dotenv';
import { InitConfig } from './config/config';
import { setupGracefulShutdown } from 'nestjs-graceful-shutdown';
import { Logger } from 'nestjs-pino';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';



async function bootstrap() {
  try{
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
      .setTitle('Analogue Yandex forms API')
      .setDescription('Simplified analogue of Yandex Forms')
      .setVersion('1.0')
      .addTag('Yandex forms')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    const argv = process.argv;
  
    app.useLogger(app.get(Logger));
  
    let yaml: any;
    yaml = InitConfig(argv.includes("--watch"))
    
    yamlConfig(yaml.env_path)
  
    setupGracefulShutdown({ app });
  
    await app.listen(yaml.port ?? 3000);
  }catch(error){
    console.error("error with starting app: ", error)
  }
}
bootstrap();

