import {Entity} from "typeorm";
import {Column, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm/index";
import {UsuarioEntity} from "../usuario/usuario.entity";
import {UUIDVersion} from "class-validator";
import {type} from "os";
import {VacunaEntity} from "../vacuna/vacuna.entity";

@Entity()
export class MascotaEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre:string;



    // RELACIONES

    // Mascota Usuario
    @ManyToOne(
        type => UsuarioEntity,
        usuario => usuario.mascotas
    )
    usuario: UsuarioEntity


    // Mascota - Vacuna
    @ManyToMany(
        type => VacunaEntity,
    )
    @JoinTable()
    vacunas: VacunaEntity[]


}




















