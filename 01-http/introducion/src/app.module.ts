import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from "./http/http-juego.module";

@Module({
  imports: [
    // Módulos
      HttpJuegoModule
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
