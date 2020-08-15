import {VacunaEntity} from "./vacuna.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Module} from "@nestjs/common";

@Module({
    imports: [
        TypeOrmModule
            .forFeature(
                [
                    VacunaEntity
                ],
                'default' // nombre de la cadena de conexion
            )
    ],
    controllers: [

    ],
    providers: [

    ]
})

// @ts-ignore
export class VacunaModule {

}