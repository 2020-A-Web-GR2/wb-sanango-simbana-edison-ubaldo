import {Module} from '@nestjs/common';
import {HttpJuegoController} from "./http-juego.controller";

// @ASDAS -> es un decorador

@Module({
    imports: [],
    controllers: [
        HttpJuegoController,
    ],
    providers: [],
})

// @ts-ignore
export class HttpJuegoModule {
}