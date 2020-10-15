import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {AulaEntity} from "./aula.entity";
import {FindManyOptions, Like, Repository} from "typeorm";


@Injectable()
export class AulaService{

    constructor(
        @InjectRepository(AulaEntity)
        private repositorio: Repository<AulaEntity>
    ) {
    }

    crearUno(aula: AulaEntity){
        return this.repositorio.save(aula)
    }

    buscarTodos(texto:string){

        let busqueda: FindManyOptions<AulaEntity>

        busqueda = {
            where: [
                {
                    numero: Like(`%${texto}%`)
                },
                {
                    piso: Like(`%${texto}%`),
                },
                {
                    conserje: Like(`%${texto}%`),
                },
                {
                    novedades: Like(`%${texto}%`),
                },
                {
                    recursos: Like(`%${texto}%`),
                }
            ]
        }

        return this.repositorio.find(busqueda)
    }

    buscarUno(id: number){
        return this.repositorio.findOne(id)
    }

    editarUno(aula:AulaEntity){
        return this.repositorio.save(aula)
    }

    eliminarUno(id:number){
        return this.repositorio.delete(id)
    }


}