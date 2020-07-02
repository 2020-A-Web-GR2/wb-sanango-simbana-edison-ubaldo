import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // Módulos
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
