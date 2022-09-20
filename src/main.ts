import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import Helmet from 'helmet';
import { AppModule } from './infrastructure/modules/app.module';

dotenv.config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  //Swagger setup.
  const options = new DocumentBuilder()
    .setTitle('Dry Clean')
    .setDescription('API For Dry Clean Application')
    .setVersion('1.0')
    .addTag('Dry Clean')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  /**
   * Apply validation for all inputs globally
   */
  app.useGlobalPipes(
    new ValidationPipe({
      /**
       * Strip away all none-object existing properties
       */
      whitelist: true,
      /***
       * Transform input objects to their corresponding DTO objects
       */
      transform: true,
    }),
  );
  /**
   * Helmet can help protect your app from some well-known
   * web vulnerabilities by setting HTTP headers appropriately.
   * Generally, Helmet is just a collection of 12 smaller
   * middleware functions that set security-related HTTP headers
   *
   * https://github.com/helmetjs/helmet#how-it-works
   */
  app.use(Helmet());

  await app.listen(process.env.PORT);
  Logger.log(
    `🚀 Application is running on: http://localhost:${process.env.PORT}/`,
  );
}
bootstrap();
