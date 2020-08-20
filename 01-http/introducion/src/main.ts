import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieParser = require('cookie-parser') // Esto viene de express.js NO de nest.js
const express = require('express')

async function bootstrap() {
  const app = await NestFactory.create(AppModule) as any;
  //const session = require('express-sesion')
  const secret = '5 a 0 te acuerdas y te duele'
  app.use(cookieParser(secret));
  app.set('view engine', 'ejs');
  app.use(express.static('publico'))
  await app.listen(3000);
}
bootstrap();
