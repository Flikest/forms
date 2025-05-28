import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config }  from 'dotenv';
import { setupGracefulShutdown } from 'nestjs-graceful-shutdown';
import { Logger } from 'nestjs-pino';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { InitDotenvConfig } from './config/config';

async function bootstrap() {
  const envPath = InitDotenvConfig()
  config(
    {
      path: envPath
    }
  )
  try{
    const app = await NestFactory.create(AppModule);

    app.useLogger(app.get(Logger));
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({ error: err.message });
    });

    const config = new DocumentBuilder()
      .setTitle('Analogue Yandex forms API')
      .setDescription('Simplified analogue of Yandex Forms')
      .setVersion('1.0')
      .addTag('Yandex forms')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  
    setupGracefulShutdown({ app });
  
    const port = process.env.APP_PORT ?? 3000 

    await app.listen(port);
    console.info("server started on port: ", port)
    
  }catch(error){
    console.error("error with starting app: ", error)
  }
}
bootstrap();

