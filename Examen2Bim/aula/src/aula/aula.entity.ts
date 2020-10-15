import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity('aula')
export class AulaEntity {

    @PrimaryGeneratedColumn({
        name: 'id',
        unsigned: true,
    })
    aulaId: number

    @Column({
        name: 'numero',
        type: 'int',
        nullable: false,
    })
    numero: number

    @Column({
        name: 'piso',
        type: 'int',
        nullable: false,
    })
    piso: number

    @Column({
        name: 'conserje',
        type: 'varchar',
        length: '100',
        nullable: false,
    })
    conserje: string

    @Column({
        name: 'recursos',
        type: 'varchar',
        length: '500',
        nullable: false,
    })
    recursos: string

    @Column({
        name: 'novedades',
        type: 'varchar',
        length: '500',
        nullable: true,
    })
    novedades?: string


}

