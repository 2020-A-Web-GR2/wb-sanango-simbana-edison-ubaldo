import {Module} from "@nestjs/common";
import {UsuarioController} from "./usuario.controller";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {UsuarioService} from "./usuario.service";
import {MascotaModule} from "../mascota/mascota.module";

@Module({
    imports: [
        MascotaModule,
        TypeOrmModule
            .forFeature(
                [
                    UsuarioEntity
                ],
                'default' // nombre de la cadena de conexion
            )
    ],
    controllers: [
        UsuarioController
    ],
    providers: [
        UsuarioService,
    ]
})

// @ts-ignore
export class UsuarioModule {

}

