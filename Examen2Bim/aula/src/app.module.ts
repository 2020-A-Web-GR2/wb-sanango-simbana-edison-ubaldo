import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AulaModule} from "./aula/aula.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AulaEntity} from "./aula/aula.entity";

@Module({
    imports: [
        AulaModule,
        TypeOrmModule.forRoot({
            name: 'default',
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'auladb',
            entities: [
                AulaEntity,
            ],
            synchronize: false,
            dropSchema: false,
        })
    ],
    controllers: [AppController],
    providers: [AppService],
})

export class AppModule {

}
