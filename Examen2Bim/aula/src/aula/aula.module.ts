import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AulaController} from "./aula.controller";
import {AulaService} from "./aula.service";
import {AulaEntity} from "./aula.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature([AulaEntity],'default')
    ],
    controllers: [
        AulaController
    ],
    providers: [
        AulaService
    ]
})

export class AulaModule{

}