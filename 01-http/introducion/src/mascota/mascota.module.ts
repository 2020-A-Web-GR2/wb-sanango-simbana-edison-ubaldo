// @ts-ignore
import {MascotaEntity} from "./mascota.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Module} from "@nestjs/common";
import {MascotaService} from "./mascota.service";

@Module({
    imports: [
        TypeOrmModule
            .forFeature(
                [
                    MascotaEntity
                ],
                'default' // nombre de la cadena de conexion
            )
    ],
    controllers: [

    ],
    providers: [
        MascotaService,
    ],
    exports: [
        MascotaService,
    ]
})

// @ts-ignore
export class MascotaModule {

}

