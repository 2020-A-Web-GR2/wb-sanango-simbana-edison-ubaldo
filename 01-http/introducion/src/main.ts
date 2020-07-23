import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieParser = require('cookie-parser') // Esto viene de express.js NO de nest.js


async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.use(cookieParser('Secreto para las cookies 1'));
  await app.listen(3000);
}
bootstrap();
