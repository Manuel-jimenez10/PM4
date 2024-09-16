import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
                            .setTitle('PI Back Manuel Jimenez')
                            .setDescription(
                              'Este proyecto integrador, desarrollado por Manuel Jimenez, emplea tecnologías avanzadas como Express y NestJS. Utiliza TypeScript como lenguaje de desarrollo principal y JavaScript como lenguaje de compilación, asegurando un código robusto y eficiente para aplicaciones modernas.'
                                            )
                            .setVersion('1.0')
                            .addBearerAuth()
                            .build();

      const document = SwaggerModule.createDocument(app, swaggerConfig);

      SwaggerModule.setup('api', app, document);
          
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,  // Elimina propiedades no definidas en el DTO
      forbidNonWhitelisted: true,  // Lanza un error si hay propiedades no permitidas
      transform: true,  // Transforma los datos entrantes según los DTO
    }),
  );
  await app.listen(3000);
}
bootstrap();
