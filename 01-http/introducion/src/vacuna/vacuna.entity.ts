import {Entity} from "typeorm";
import {Column, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm/index";
import {MascotaEntity} from "../mascota/mascota.entity";

@Entity()
export class VacunaEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre:string;


    //RELACIONES
    // Mascota - Vacuna
    /*@ManyToMany(
        type => MascotaEntity,
    )
    @JoinTable()
    mascotas: MascotaEntity[] */

}
