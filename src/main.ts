import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  var config = new DocumentBuilder()
    .setTitle('Crud-Users')
    .setDescription('É um desafio de api Rest Nodejs')
    .setVersion('1.0')
    .addTag('Mr. English')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/", app, document)

  await app.listen(3000); 
}
bootstrap();
