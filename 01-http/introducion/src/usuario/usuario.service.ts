import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {UsuarioEntity} from "./usuario.entity";
import {InjectRepository} from "@nestjs/typeorm";


@Injectable()
// @ts-ignore
export class UsuarioService {
// DBEAVER
    constructor( //Inyeccion de dependencias
        @InjectRepository(UsuarioEntity)
        private repositorio: Repository<UsuarioEntity>

    ) {
    }


    crearUno(nuevoUsuario: UsuarioEntity){
        return this.repositorio.save(nuevoUsuario)
    }



}