import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpJuegoModule} from "./http/http-juego.module";
import {CalcCookiesModule} from "./deber 01/calc-cookies.module";
import {UsuarioModule} from "./usuario/usuario.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario/usuario.entity";

@Module({
  imports: [
    // Módulos
      HttpJuegoModule,
      CalcCookiesModule,
      UsuarioModule,
      TypeOrmModule.forRoot({
          name: 'default', // nombre conexion
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'root',
          database: 'ejemplo',
          entities: [ // Descritas las entidades a las cuales me voy a conectar
              UsuarioEntity
          ],
          synchronize: true, // actualiza el esquema de la DB
          dropSchema: false // eliminar los datos y el esquema de base de datos
      }),
  ],
    // docker start mysqlCon
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
