import Config from './config/app';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, NestApplicationOptions } from '@nestjs/common';

class Bootstrap {
  public static async bootstrap() {
    try {
      const nestApplicationOptions: NestApplicationOptions = {
        cors: {
          origin: true,
          preflightContinue: false,
        },
      };
      const app = await NestFactory.create(AppModule, nestApplicationOptions);

      app.setGlobalPrefix('testV1')

      const options = new DocumentBuilder()
        .setTitle('Api')
        .setDescription(
          'Api Rest que provee la información necesaria para la consulta.',
        )
        .setVersion('1.1')
        .addTag(process.env.NAME)
        .build();
      const document = SwaggerModule.createDocument(app, options);

      SwaggerModule.setup('test/api', app, document);
      await app.listen(Config.port);
    } catch (error) {
      console.log(error);

    }
  }

}

Bootstrap.bootstrap()
