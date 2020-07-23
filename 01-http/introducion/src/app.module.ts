import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from "./http/http-juego.module";
import {CalcCookiesModule} from "./deber 01/calc-cookies.module";

@Module({
  imports: [
    // Módulos
      HttpJuegoModule,
      CalcCookiesModule
  ],
  controllers: [
    // Controladores
      AppController
  ],
  providers: [
    // Servicios
      AppService
  ],
})
export class AppModule {}
